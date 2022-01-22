import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { supportedChainIds } from '../../constants/chainIds';
import { RPC_URLS } from '../../constants/rpcURLs';
import { Explorers } from '../../constants/explorers';
import { ethers } from 'ethers';


const injected = new InjectedConnector({ supportedChainIds: Object.values(supportedChainIds) })
const network = new NetworkConnector({ 
  urls: { 25: RPC_URLS[25], 338: RPC_URLS[338] },
  defaultChainId: process.env.NODE_ENV === "production" 
    ? 25 : 338  
});
const rpc = process.env.NODE_ENV === "production" ? {25: RPC_URLS[25]} : {338: RPC_URLS[338]};
const walletConnect = new WalletConnectConnector({
  rpc: {25: RPC_URLS[25]},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});


let connector: AbstractConnector;
export const connect = async (name: string) =>{
  const injectedWallets = ["trustwallet", "metamask", "coinbase", "mathwallet"];
  // let address:string, chainId: keyof typeof Explorers, explorer: string, library: ethers.providers.Web3Provider
  if(injectedWallets.includes(name)) name = "injected";
  switch (name){
    case ("injected"):
      connector = injected;
      break;
    case ("walletconnect"):
      connector = walletConnect;
      break;
    default:
      connector = injected;
  }

  try{
    await connector.activate();
    const chainId = Number(await connector.getChainId()) as keyof typeof Explorers;
    if(!Object.values(supportedChainIds).includes(chainId)){
      throw new Error(
        `Chain is not supported, connect to the Cronos chain ${process.env.NODE_ENV === "production" ? "mainnet" : "testnet"}`
      );
    }

    const address = await connector.getAccount();
    const explorer = Explorers[chainId];
    const provider =  await connector.getProvider(); 
    return { chainId, address, explorer, provider };
  }catch(err: any){
    console.error(err);
    alert(err.message);
  }

  connector.on("accountsChanged", (addresses) => console.log("addresses", addresses[0]))
}

export const disconnect = async () => {
  if(connector){
    connector.deactivate();
  }
}

