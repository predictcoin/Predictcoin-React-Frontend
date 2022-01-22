import { disconnect } from "process";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WalletStore } from "../../../application/domain/wallet/walletStore";
import { 
  connectWallet as conectWalletAction, 
  disconnectWallet as disconnectWalletAction, 
  setWallet as setWalletAction
} from "../actions/wallet";
import { AppRootState } from "./index";

const walletSelector = (state: AppRootState) => state.wallet;

export const useWalletStore = (): WalletStore => {
  const {wallet, chainId, explorer, name, isConnecting, active, } = useSelector(walletSelector);

  const dispatch = useDispatch();

  const connectWallet = useCallback((name: string) => conectWalletAction(name)(dispatch), [dispatch])

  const disconnectWallet = useCallback(() => disconnectWalletAction()(dispatch), [dispatch]);

  return {
    // 
    wallet,
    active,
    chainId,
    explorer,
    name,
    isConnecting,
    
    // 
    connect: connectWallet,
    disconnect: disconnectWallet,
    // setWallet
  }
}