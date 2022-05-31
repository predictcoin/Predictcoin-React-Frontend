import { ethers,utils } from "ethers";
import { AUTOSHARK_ADDRESSES, PANCAKE_ADDRESSES, TOKENS } from "../../constants/addresses";
import { supportedChainIds } from "../../constants/chainIds";
import { ERC20, ERC20__factory, LPToken__factory, PancakeRouter__factory } from "../../typechain"
import { getChainId } from "./chain";
import BigNumber from "bignumber.js";
// import { toNumberLib } from "./number";

const chainId = getChainId();
const {PRED, BID, WBNB, BUSD} = TOKENS[chainId];
const PancakeswapRouter = (provider: ethers.providers.Provider | ethers.Signer) => PancakeRouter__factory.connect(PANCAKE_ADDRESSES[getChainId()], provider);
const AutosharkRouter = (provider: ethers.providers.Provider | ethers.Signer) => PancakeRouter__factory.connect(AUTOSHARK_ADDRESSES[getChainId()], provider);

const getPriceWithPancakeRouter = async (path: string[], provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const router = PancakeswapRouter(provider);
  const amounts = await router.getAmountsOut(utils.parseEther("1"), path);
  const token: ERC20  = ERC20__factory.connect(path[path.length-1], provider);
  const decimals = await token.decimals();
  return new BigNumber(utils.formatUnits(amounts[amounts.length-1], decimals));
}


const getPriceWithAutosharkRouter = async (path: string[], provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const router = AutosharkRouter(provider);
  const amounts = await router.getAmountsOut(utils.parseEther("1"), path);
  const token: ERC20 = ERC20__factory.connect(path[path.length-1], provider);
  const decimals = await token.decimals();
  
  return new BigNumber(utils.formatUnits(amounts[amounts.length-1], decimals));
}

export const getPREDPrice = async(provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const chainId = getChainId();
  if(chainId === supportedChainIds.Testnet) new BigNumber("1");
  const path = [PRED, BUSD]
  return getPriceWithPancakeRouter(path, provider)
}

export const getPREDLpTokenPrice = async(provider: ethers.providers.Provider | ethers.Signer, lpToken: string): Promise<BigNumber> => {
  let tokenPrice: BigNumber, Token: ERC20;
  const LpToken = LPToken__factory.connect(lpToken, provider);
  
  const getPriceWithToken = async (index: 0|1): Promise<BigNumber> => {
    const token = await LpToken[index === 0 ? "token0" : "token1"]();
    Token = ERC20__factory.connect(token, provider);
    return getPriceWithPancakeRouter([token, BUSD], provider);
  }

  
  const token0 = await LpToken.token0();
  const predPosition = token0 === PRED ? 0 : 1
  tokenPrice = await getPriceWithToken(predPosition);

  

  // @ts-ignore
  const lpBalance = new BigNumber((await Token.balanceOf(lpToken)).toString());
  // @ts-ignore
  const totalLpSupply = toNumberLib(await LpToken.totalSupply());
  return lpBalance.times(2).times(tokenPrice).div(totalLpSupply);
}

// const getMMFPrice = async


export const getBIDPrice = async(provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const chainId = getChainId();
  if(chainId === supportedChainIds.Testnet) new BigNumber("1");
  const path = [BID, WBNB, BUSD]
  return getPriceWithAutosharkRouter(path, provider)
}

// const {CRP, MMF, USDT} = TOKENS[chainId];
// const MMFRouter = (provider: ethers.providers.Provider | ethers.Signer) => UniRouter__factory.connect(MMFROUTER_ADDRESSES[getChainId()], provider);

// const getPriceWithMMFRouter = async (path: string[], provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
//   const router = MMFRouter(provider);
//   const amounts = await router.getAmountsOut(utils.parseEther("1"), path);
//   const token = ERC20__factory.connect(path[path.length-1], provider);
//   const decimals = await token.decimals();
//   return new BigNumber(utils.formatUnits(amounts[amounts.length-1], decimals));
// }

// export const getCRPPrice = async(provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
//   const chainId = getChainId();
//   if(chainId === supportedChainIds.Testnet) new BigNumber("1");
//   const path = [CRP, MMF, USDT];
//   return getPriceWithMMFRouter(path, provider);
// }

// export const getMMFPrice = async(provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
//   const chainId = getChainId();
//   if(chainId === supportedChainIds.Testnet) new BigNumber("0.1");
//   const path = [MMF, USDT];
//   return getPriceWithMMFRouter(path, provider);
// }

// export const getMMFLpTokenPrice = async(provider: ethers.providers.Provider | ethers.Signer, lpToken: string): Promise<BigNumber> => {
//   let tokenPrice: BigNumber, Token: ERC20;
//   const LpToken = MMFLpToken__factory.connect(lpToken, provider);
  
//   const getPriceWithToken = async (index: 0|1): Promise<BigNumber> => {
//     const token = await LpToken[index === 0 ? "token0" : "token1"]();
//     Token = ERC20__factory.connect(token, provider);
//     return getPriceWithMMFRouter([token, MMF, USDT], provider);
//   }

//   try{
//     tokenPrice = await getPriceWithToken(0);
//   }catch{
//     tokenPrice = await getPriceWithToken(1);
//   }
  

//   // @ts-ignore
//   const lpBalance = new BigNumber((await Token.balanceOf(lpToken)).toString());
//   // @ts-ignore
//   const totalLpSupply = toNumberLib(await LpToken.totalSupply());
//   return lpBalance.times(2).times(tokenPrice).div(totalLpSupply);
// }

// // const getMMFPrice = async
