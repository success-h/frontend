import { Cluster } from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Self } from "~/types/api";

// eslint-disable-next-line react-hooks/rules-of-hooks
const postHandler = useMongoMiddleware(
  async ({ body }: NextApiRequest, res: NextApiResponse) => {
    const { cluster, self } = body;

    if (!self) {
      res.status(400).json({
        error: "Invalid public key",
      });
      return;
    }

    const db = getMongoDatabase(cluster as Cluster);

    const userCollection = db.collection<Self>("users");

    const result = await userCollection.insertOne(self);

    res.json({
      success: true,
      self: {
        _id: result.insertedId.toString(),
        ...self,
      },
    });
  }
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const getHandler = useMongoMiddleware(
  async ({ query }: NextApiRequest, res: NextApiResponse) => {
    const { cluster, publicKey } = query;

    if (!publicKey) {
      res.status(400).json({
        error: "Invalid public key",
      });
      return;
    }

    const db = getMongoDatabase(cluster as Cluster);

    const userCollection = db.collection<Self>("users");

    const user = await userCollection.findOne({
      wallets: { $in: [publicKey] },
    });

    if (!user) {
      res.status(200).json({
        success: false,
        error: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return getHandler(req, res);
  }

  return postHandler(req, res);
};

export default pipe(
  handler,
  matchMethodMiddleware(["GET", "POST"]),
  attachClusterMiddleware
);
