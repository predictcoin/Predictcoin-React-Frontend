import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { supportedChainIds } from '../../../constants/chainIds';
import { RPC_URLS } from '../../../constants/rpcURLs';
import { Explorers } from '../../../constants/explorers';
import { getChainId } from '../../../lib/utils/chain';
import { ethers } from 'ethers';
import { et } from 'date-fns/locale';


// web3js connectors
const injected = new InjectedConnector({ supportedChainIds: Object.values(supportedChainIds) })
const network = new NetworkConnector({ 
  urls: { 25: RPC_URLS[25], 338: RPC_URLS[338] },
  defaultChainId: getChainId()
});

const rpc = getChainId();
const walletConnect = new WalletConnectConnector({
  rpc: {25: RPC_URLS[rpc]},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const addNetwork = async (provider: ethers.providers.ExternalProvider) => {
  if(!provider.request) return;
  const chainId = getChainId();
  try {
    await provider?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexlify(chainId) }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError?.code === 4902) {
      try {
        await provider?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: ethers.utils.hexlify(chainId),
              chainName: 'Cronos Mainnet Beta',
              rpcUrls: [RPC_URLS[chainId]],
              blockExplorerUrls: [Explorers[chainId]],
              nativeCurrency: {
                name: "Cronos",
                symbol: "CRO", // 2-6 characters long
                decimals: 18,
              }
            },
          ],
        });
      } catch (addError: any) {
        throw new Error(addError);
      }
    }
    // handle other "switch" errors
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
    default:
      connector = network;
  }

  try{
    await connector.activate();
    const chainId = Number(await connector.getChainId()) as keyof typeof Explorers;
    const provider =  await connector.getProvider(); 
    if(!Object.values(supportedChainIds).includes(chainId)){
      await addNetwork(provider);
    }

    const address = await connector.getAccount();
    const explorer = Explorers[chainId];
    
    return { chainId, address, explorer, provider, connector };
  }catch(err: any){
    console.error(err);
    alert(err.message);
  }

  connector.on("accountsChanged", (...args) => console.log("args", args));
}

export const disconnect = async () => {
  if(connector){
    connector.deactivate();
  }
}

