import BigNumber from "bignumber.js";
import { TOKENS } from "../../../constants/addresses";
import { getChainId } from "../../../lib/utils/chain";
import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
import { getCRPPrice, getMMFPrice } from "../../../lib/utils/price";
import { LoserPrediction, WinnerPrediction } from "../../../typechain";
import { PredictionPoolStore } from "../../domain/predictionPools/predictionPoolsStore";
import { PredictionPool } from "../../domain/predictionPools/entity";


interface PredictionPoolAprProps{
  pool: PredictionPool,
  rewardTokenPrice: BigNumber,
  rewardTokenPerBlock: BigNumber
  lpTokenPrice: BigNumber,
}

interface initProps
 {
  contract: LoserPrediction | WinnerPrediction,
  userAddress?: string,
  CRPPrice: BigNumber,
}

let CRPPrice: BigNumber;

export const apr = async ({pool, rewardTokenPrice, rewardTokenPerBlock, lpTokenPrice}: 
  PredictionPoolAprProps): Promise<BigNumber> => {
  const totalRewardPerYr = rewardTokenPerBlock.times(17280).times(365);
  const numerator = totalRewardPerYr.times(rewardTokenPrice || 0).times(100);
  const denominator = pool.amount.times(lpTokenPrice || 0);
  console.log(numerator.toString(), denominator.toString());
  return numerator.div(denominator);
}

const init = async ({contract, userAddress, CRPPrice}: initProps): Promise<Omit<PredictionPoolStore, 
  "available" | "isLoading" | "pastPools" | "rewardToken" | "rewardTokenPerBlock" | "rewardTokenPrice" | 
  "lpTokenPrice"| "lpToken" >> => {
  const pools: {[key: number]: PredictionPool} = {};

  const currentPool = toNumberLib(await contract.poolLength()).minus(1).toNumber();
  const pool: PredictionPool = propertiesToNumberLib(await contract.poolInfo(currentPool)) as PredictionPool;
  pool.lpTokenDecimals = 18;
  pool.round = pool.epoch.toNumber();
  
  pool.totalStaked = pool.amount;
  pool.total$Staked = CRPPrice.times(pool.amount);

  if (userAddress){
    pool.userStaked = toNumberLib((await contract.userInfo(currentPool, userAddress)).amount);
    pool.user$Staked = CRPPrice.times(pool.userStaked);
  }

  pools[currentPool] = pool;

  return {
    address: contract.address,
    pools,
    currentPool,
  }
}


export const initLoserPool = async ({contract, userAddress}: {contract: LoserPrediction, userAddress: string}): 
  Promise<Omit<PredictionPoolStore, "available" | "isLoading" | "pastPools">> =>{
  CRPPrice = !CRPPrice ? await getCRPPrice(contract.provider): CRPPrice;
  const rewardToken = await contract.rewardToken();
  const poolStore = await init({contract, userAddress, CRPPrice}) as PredictionPoolStore;
  poolStore.rewardToken = rewardToken;
  poolStore.rewardTokenPrice = await getMMFPrice(contract.provider);
  poolStore.rewardTokenPerBlock = toNumberLib((await contract.rewardTokenPerBlock()).mul(await contract.BONUS_MULTIPLIER()));

  poolStore.lpToken = TOKENS[getChainId()].CRP;
  poolStore.lpTokenPrice = CRPPrice;

  const pool = poolStore.pools[poolStore.currentPool];
  pool.apr = await apr({
    pool, rewardTokenPrice: CRPPrice, rewardTokenPerBlock: poolStore.rewardTokenPerBlock,
    lpTokenPrice: poolStore.lpTokenPrice
  });
  if(userAddress){
    pool.earned = toNumberLib(await contract.pendingRewardToken(poolStore.currentPool, userAddress))
    pool.$Earned = pool.earned.times(CRPPrice);
    pool.lostRound = await contract.lostRound(userAddress, pool.round);
  }

  return poolStore;
}

export const initWinnerPool = async ({contract, userAddress}: {contract: WinnerPrediction, userAddress: string}): 
  Promise<Omit<PredictionPoolStore, "available" | "isLoading" | "pastPools">> => {
  CRPPrice = !CRPPrice ? await getCRPPrice(contract.provider): CRPPrice;
  console.log(CRPPrice.toString(), "CRPPrice")
  const poolStore = await init({contract, userAddress, CRPPrice}) as PredictionPoolStore;
  poolStore.rewardToken = TOKENS[getChainId()].CRP;
  poolStore.rewardTokenPrice = CRPPrice;
  poolStore.rewardTokenPerBlock = toNumberLib((await contract.CRPPerBlock()).mul(await contract.BONUS_MULTIPLIER()));
  
  poolStore.lpToken = TOKENS[getChainId()].CRP;
  poolStore.lpTokenPrice = CRPPrice;
  
  const pool = poolStore.pools[poolStore.currentPool];

  pool.apr = await apr({
    pool, rewardTokenPrice: CRPPrice, 
    rewardTokenPerBlock: poolStore.rewardTokenPerBlock,
    lpTokenPrice: poolStore.lpTokenPrice
  });
  if(userAddress){
    pool.earned = toNumberLib(await contract.pendingCRP(poolStore.currentPool, userAddress));
    pool.$Earned = pool.earned.times(CRPPrice);
    pool.wonRound = await contract.wonRound(userAddress, pool.round);
  }

  return poolStore
}
