import { ethers } from "ethers";
import { WalletStore } from "../domain/wallet/walletStore";
import { connectWallet } from "../usecases/wallet/connect";
import { disconnectWallet } from "../usecases/wallet/disconnect";

export const walletViewModel = (store: WalletStore) => {
  const showSpinner = store.isConnecting;

  const connect = (name: string, chainId?: number) => connectWallet({chainId, store, name})

  const disconnect = () => disconnectWallet(store);

  return {
    address: store.wallet?.address,
    library: store.wallet.provider && new ethers.providers.Web3Provider(store.wallet?.provider),
    active: store.active,
    connect,
    showSpinner,
    disconnect,
    explorer: store.explorer
  }
};
