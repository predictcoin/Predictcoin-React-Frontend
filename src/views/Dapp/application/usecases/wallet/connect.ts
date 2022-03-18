import { connect, } from "../../infrastructure/connectors";

export interface connectWalletParams{
  name: string;
  chainId?: number;
}

export const connectWallet = async (params: connectWalletParams) => {
  const {name} = params;
  const args = await connect(name);
  if(args !== undefined){
    const {chainId, address, explorer, provider} = args;
    localStorage.setItem("wallet", name);
    return {chainId, address, explorer, externalProvider: provider};
  }

  return undefined;
}