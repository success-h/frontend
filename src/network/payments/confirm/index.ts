import { Cluster } from "@solana/web3.js";
import { ConfirmPaymentResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster: Cluster;
  publicKey: string;
  reference: string;
  signal?: AbortSignal;
};

export const confirmPayment = async ({
  cluster,
  publicKey,
  reference,
  signal = new AbortController().signal,
}: Param) => {
  const response = await fetch(getApiRoute("/api/payment/confirm"), {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cluster,
      publicKey,
      reference,
    }),
  });

  return response.json() as Promise<ConfirmPaymentResponse>;
};
