import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch} from "react-redux";
import { connectWalletAction, disconnectWalletAction } from "../infrastructure/redux/actions/wallet";
import { useWalletStore } from "../infrastructure/redux/stores/wallet";
import { RPC_URLS } from "../../constants/rpcURLs";
import { getChainId } from "../../lib/utils/chain";

const defaultLibrary = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_ENVIRONMENT === "production" || process.env.REACT_APP_ENVIRONMENT === "staging"
  ? RPC_URLS[25] : RPC_URLS[338] 
);

export const useWalletViewModel = () => {
  const store = useWalletStore();
  const showSpinner = store.isConnecting;
  const dispatch = useDispatch();
  const externalProvider = store.externalProvider && new ethers.providers.Web3Provider(store.externalProvider);
  
  useEffect(() => {
    externalProvider?.removeAllListeners();
    }, [store.externalProvider]
  )


  const connect = useCallback(async (name: string) => {
    await connectWalletAction(name)(dispatch);
  }, [dispatch]);
  const disconnect = useCallback(() => {
    disconnectWalletAction()(dispatch);
  }, [dispatch]);

  const provider = externalProvider || defaultLibrary;
  const chainId  = !store.chainId ? (getChainId()) : store.chainId;
  let signer: ethers.Signer | undefined = undefined;
  if(store.externalProvider){
    signer = provider.getSigner()
  }

  return {
    address: store.address,
    chainId,
    provider,
    active: store.active,
    connect,
    showSpinner,
    disconnect,
    explorer: store.explorer,
    signer,
  }
};

