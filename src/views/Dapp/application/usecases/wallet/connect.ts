import { supportedChainIds } from "../../../constants/chainIds";
import { WalletStore } from "../../domain/wallet/walletStore";

export interface connectWalletParams{
  name: string;
  store: WalletStore
  chainId?: number;
}

export const connectWallet = (params: connectWalletParams) => {
  const {name, store} = params;
  store.connect(name);
}