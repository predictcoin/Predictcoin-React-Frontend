import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { DeFiWeb3Connector } from "deficonnect";
import { supportedChainIds } from '../../../constants/chainIds';
import { RPC_URLS } from '../../../constants/rpcURLs';
import { Explorers } from '../../../constants/explorers';
import { getChainId } from '../../../lib/utils/chain';
import { ethers } from 'ethers';
import { toast } from "react-toastify";
import { ToastBody, STATUS, TYPE } from "../../../Components/Toast";


// web3js connectors
const injected = new InjectedConnector({ supportedChainIds: Object.values(supportedChainIds) })
const network = new NetworkConnector({ 
  urls: { 56: RPC_URLS[56], 97: RPC_URLS[97] },
  defaultChainId: getChainId()
});

const rpc = getChainId();
const walletConnect = new WalletConnectConnector({
  rpc: {56: RPC_URLS[rpc]},
  chainId: 56,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const deficonnect = new DeFiWeb3Connector({
  supportedChainIds: [56],
  rpc: {
    56: "https://bsc-dataseed1.binance.org",
  },
  pollingInterval: 15000,
});

export const addNetwork = async (provider: ethers.providers.ExternalProvider) => {
  if(!provider.request) return;
  const chainId = getChainId();
  try {
    await provider?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexlify(chainId) }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError?.code === 4902 || switchError?.code === -32603) {
      try {
        await provider?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: ethers.utils.hexlify(chainId),
              chainName: process.env.REACT_APP_ENVIRONMENT === "mainnet" || process.env.REACT_APP_ENVIRONMENT === "staging" ? 'BSC Mainnet' : "BSC Testnet",
              rpcUrls: [RPC_URLS[chainId]],
              blockExplorerUrls: [Explorers[chainId]],
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "BNB", // 2-6 characters long
                decimals: 18,
              }
            },
          ],
          
        });
      } catch (addError: any) {
        if(addError?.code === 4001){
          const body = ToastBody("User rejected the request to add network", STATUS.ERROR, TYPE.ERROR);
          toast(body);
        }
        console.error(addError);
      }
    }
    if(switchError?.code === 4001){
      const body = ToastBody("User rejected the request to switch network", STATUS.ERROR, TYPE.ERROR);
      toast(body);
    }
    console.error(switchError)
  }
}

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
    case ("deficonnect"):
      connector = deficonnect
      break;
    default:
      connector = network;
  }

  try{
    await connector.activate();
    const chainId = Number(await connector.getChainId()) as keyof typeof Explorers;
    const provider =  await connector.getProvider(); 
    if(!Object.values(supportedChainIds).includes(chainId) && name === "injected"){
      await addNetwork(provider);
    }
    if(!Object.values(supportedChainIds).includes(chainId)){
      return undefined;
    }

    const address = await connector.getAccount();
    const explorer = Explorers[chainId];
    
    return { chainId, address, explorer, provider, connector };
  }catch(err: any){
    console.error(err);
    let body;
    if(err.code === -32002){
      body = ToastBody("User has a pending connection request", STATUS.ERROR, TYPE.ERROR)
    } else if(err.name === "NoEthereumProviderError"){
      body = ToastBody("User does not have selected wallet", STATUS.ERROR, TYPE.ERROR)
    }
    else {
      body = ToastBody(err.message, STATUS.ERROR, TYPE.ERROR);
    }
    toast(body);
  }
}

export const disconnect = async () => {
  connector?.deactivate();
}

