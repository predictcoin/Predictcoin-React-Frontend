import { ethers } from "ethers";
import { Wallet } from "./entity";

export interface WalletStore{
  // State
  address: string,
  externalProvider: ethers.providers.ExternalProvider,
  active: boolean;
  chainId: number;
  explorer: string;
  name: string;
  isConnecting: boolean;
}
