import { useWallet } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import { useEffect } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useNullableSelf = () => {
  const { publicKey } = useWallet();
  const endpoint = useCluster();

  const self = usePlayerStore((state) => state.self);
  const fetchSelf = usePlayerStore((state) => state.fetchSelf);

  useEffect(() => {
    if (publicKey) {
      if (self && self.wallets?.includes(publicKey.toString())) {
        return;
      }

      fetchSelf(endpoint.cluster, publicKey.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return {
    isFetching: self === null,
    self,
  };
};

export const useSelf = () => {
  const self = usePlayerStore((s) => s.self);

  invariant(
    self,
    "This hook is meant to be used inside a `SelfRetriever` component!"
  );

  return self;
};
