import {
  findReference,
  FindReferenceError,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Transaction } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { isValidFaction } from "~/utils/isFaction";
import { isPublicKey } from "~/utils/pubkey";
import { transferTo } from "./transferTo";

const sendTokens = async ({
  connection,
  recipient,
}: {
  connection: Connection;
  recipient: string;
}) => {
  const mint = new PublicKey("67D3p1VhvZbTVD26koiNkqCDDYFtgbnYmf6rUiVSiAuV");

  try {
    await transferTo({ connection, mint, recipient: new PublicKey(recipient) });

    console.log("[dd] payment success");
    return true;
  } catch (e) {
    console.log("[dd] payment error", e);

    return false;
  }
};

const amount = new BigNumber(25);

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    cluster: clusterParam,
    faction,
    reference: referenceParam,
    publicKey,
  } = body;

  if (!referenceParam || !isValidFaction(faction) || !isPublicKey(publicKey)) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const cluster = clusterParam as Cluster;

  const reference = new PublicKey(referenceParam);
  const connection = new Connection(getConnectionClusterUrl(cluster));

  try {
    const signatureInfo = await findReference(connection, reference, {
      finality: "confirmed",
    });

    await validateTransfer(
      connection,
      signatureInfo.signature,
      {
        recipient: SAI_CITIZEN_WALLET_DESTINATION,
        splToken:
          cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
        amount,
        reference,
      },
      { commitment: "confirmed" }
    );
  } catch (e) {
    if (e instanceof FindReferenceError) {
      console.log("Not found yet", e);

      res.status(200).json({
        success: true,
        verified: false,
      });
      return;
    }

    if (e instanceof ValidateTransferError) {
      console.error("Transaction is invalid", e);

      res.status(200).json({
        success: false,
        error: "Invalid transaction",
      });
      return;
    }

    res.status(200).json({
      success: false,
      error: "Generic error",
    });

    return;
  }

  const db = getMongoDatabase(cluster);

  const transactionsCollection = db.collection<Transaction>("transactions");

  await transactionsCollection.findOneAndUpdate(
    {
      reference: referenceParam,
      status: "PENDING",
    },
    {
      $set: {
        status: "ACCEPTED_WITHOUT_RETURN",
      },
    }
  );

  const status = await sendTokens({ connection, recipient: publicKey });

  if (!status) {
    res.status(200).json({
      success: false,
      error: "Not able to send tokens",
    });

    return;
  }

  await transactionsCollection.findOneAndUpdate(
    {
      reference: referenceParam,
      status: "ACCEPTED_WITHOUT_RETURN",
    },
    {
      $set: {
        status: "ACCEPTED",
      },
    }
  );

  res.status(200).json({
    success: true,
    verified: true,
  });
};

export default pipe(
  matchMethodMiddleware(handler, ["POST"]),
  attachClusterMiddleware,
  useMongoMiddleware
);
