import { Wallet } from "./entity";

export interface WalletStore{
  // State
  wallet: Wallet;
  active: boolean;
  chainId: number;
  explorer: string;
  name: string;
  isConnecting: boolean;

  // Actions
  connect: (name:string) => Promise<void>;
  disconnect: () => void;
  // store: (wallet: Wallet) => void;
}
