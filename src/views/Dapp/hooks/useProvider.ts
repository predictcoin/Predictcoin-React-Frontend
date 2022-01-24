import { ethers } from "ethers";
import { useWalletStore } from "../models/infrastructure/redux/stores/wallet";


const useProvider = (): ethers.providers.Web3Provider => {
  const {wallet:{provider}} = useWalletStore()
  return new ethers.providers.Web3Provider(provider);
}

export default useProvider;