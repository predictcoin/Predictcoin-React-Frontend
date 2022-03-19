import { BigNumber, ethers,utils } from "ethers";
import { MMFROUTER_ADDRESSES, TOKENS } from "../../constants/addresses";
import { supportedChainIds } from "../../constants/chainIds";
import { ERC20, ERC20__factory, MMFLpToken__factory, UniRouter__factory } from "../../typechain"
import { getChainId } from "./chain";

const chainId = getChainId();
const {CRP, MMF, USDT} = TOKENS[chainId];
const MMFRouter = (provider: ethers.providers.Provider | ethers.Signer) => UniRouter__factory.connect(MMFROUTER_ADDRESSES[getChainId()], provider);

const getPriceWithMMFRouter = async (path: string[], provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const router = MMFRouter(provider);
  const amounts = await router.getAmountsOut(utils.parseEther("1"), path);
  return amounts[amounts.length-1];
}

export const getCRPPrice = async(provider: ethers.providers.Provider | ethers.Signer): Promise<BigNumber> => {
  const chainId = getChainId();
  if(chainId === supportedChainIds.Testnet) return BigNumber.from(1);
  const path = [CRP, MMF, USDT];
  return getPriceWithMMFRouter(path, provider);
}

export const getMMFLpTokenPrice = async(provider: ethers.providers.Provider | ethers.Signer, lpToken: string): Promise<BigNumber> => {
  let tokenPrice: BigNumber, Token: ERC20;
  const LpToken = MMFLpToken__factory.connect(lpToken, provider);
  
  const getPriceWithToken = async (index: 0|1): Promise<BigNumber> => {
    const token = await LpToken[index === 0 ? "token0" : "token1"]();
    Token = ERC20__factory.connect(token, provider);
    return await getPriceWithMMFRouter([token, MMF, USDT], provider);
  }

  try{
    tokenPrice = await getPriceWithToken(0);
  }catch{
    tokenPrice = await getPriceWithToken(1);
  }

  // @ts-ignore
  const lpBalance = await Token.balanceOf(lpToken);
  const totalLpSupply = await LpToken.totalSupply();
  return lpBalance.mul(2).mul(tokenPrice).div(totalLpSupply);
}

// const getMMFPrice = async
