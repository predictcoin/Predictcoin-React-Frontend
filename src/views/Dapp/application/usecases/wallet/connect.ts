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
    provider.on("accountsChanged", ([address]: string[]) => {
      window.location.reload();
      // dispatch({
      //   type: actionTypes.SET_WALLET,
      //   data: {
      //     wallet: {address, provider}
      //   }
      // })
    });

    provider.on("chainsChanged", () => {
      window.location.reload();
    });
  
  return {chainId, address, explorer, provider};
  }

  return undefined;
}