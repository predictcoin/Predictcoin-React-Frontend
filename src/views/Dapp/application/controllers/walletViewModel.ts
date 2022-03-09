import { ethers } from "ethers";
import { useCallback } from "react";
import { useDispatch} from "react-redux";
import { connectWalletAction, disconnectWalletAction } from "../infrastructure/redux/actions/wallet";
import { useWalletStore } from "../infrastructure/redux/stores/wallet";
import { RPC_URLS } from "../../constants/rpcURLs";


export const useWalletViewModel = () => {
  const store = useWalletStore();
  const showSpinner = store.isConnecting;
  const dispatch = useDispatch();
  
  const connect = useCallback((name: string) => connectWalletAction(name)(dispatch), [dispatch])

  const disconnect = useCallback(() => disconnectWalletAction()(dispatch), [dispatch]);
  const defaultLibrary = new ethers.providers.JsonRpcProvider(
    process.env.NODE_ENV === "production" ? RPC_URLS[25] : RPC_URLS[338] 
  );
  const provider = !store.externalProvider ? defaultLibrary : new ethers.providers.Web3Provider(store.externalProvider)
  const chainId  = !store.chainId ? (process.env.NODE_ENV === "production" ? 25 : 338) : store.chainId

  return {
    address: store.address,
    chainId,
    provider,
    active: store.active,
    connect,
    showSpinner,
    disconnect,
    explorer: store.explorer
  }
};

