import { WalletStore } from "../../domain/wallet/walletStore";

export const disconnectWallet = (store: WalletStore): Promise<void> | void => {
  if(store.active){
    return store.disconnect();
  }
}
