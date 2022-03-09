import { useSelector } from "react-redux";

import { WalletStore } from "../../../domain/wallet/walletStore";
import { AppRootState } from "./index";

export const walletSelector = (state: AppRootState) => state.wallet;

export const useWalletStore = (): WalletStore => {
  const store = useSelector(walletSelector);
  return store;
}
