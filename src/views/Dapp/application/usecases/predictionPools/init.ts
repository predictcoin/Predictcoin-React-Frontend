import BigNumber from "bignumber.js";
import { TOKENS } from "../../../constants/addresses";
import { getChainId } from "../../../lib/utils/chain";
import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
import { getPREDPrice, getBIDPrice } from "../../../lib/utils/price";
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
  PREDPrice: BigNumber,
}

let PREDPrice: BigNumber;

export const apr = async ({pool, rewardTokenPrice, rewardTokenPerBlock, lpTokenPrice}: 
  PredictionPoolAprProps): Promise<BigNumber> => {
  const totalRewardPerYr = rewardTokenPerBlock.times(28800).times(365);
  const numerator = totalRewardPerYr.times(rewardTokenPrice || 0).times(100);
  const denominator = pool.amount.times(lpTokenPrice || 0);
  return numerator.div(denominator);
}

const init = async ({contract, userAddress, PREDPrice}: initProps): Promise<Pick<PredictionPoolStore, 
  "address" | "pools" | "currentPool" >> => {
  const pools: {[key: number]: PredictionPool} = {};

  const currentPool = toNumberLib(await contract.poolLength()).minus(1).toNumber();
  const pool: PredictionPool = propertiesToNumberLib(await contract.poolInfo(currentPool)) as PredictionPool;
  pool.lpTokenDecimals = 18;
  pool.round = pool.epoch.toNumber();
  
  pool.totalStaked = pool.amount;
  
  pool.total$Staked = PREDPrice.times(pool.amount);

  if (userAddress){
    pool.userStaked = toNumberLib((await contract.userInfo(currentPool, userAddress)).amount);
    pool.user$Staked = PREDPrice.times(pool.userStaked);
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
  PREDPrice = !PREDPrice ? await getPREDPrice(contract.provider): PREDPrice;
  const rewardToken = await contract.BID();
  const poolStore = await init({contract, userAddress, PREDPrice}) as PredictionPoolStore;
  poolStore.rewardToken = rewardToken;
  poolStore.rewardTokenPrice = await getBIDPrice(contract.provider);
  poolStore.rewardTokenPerBlock = toNumberLib((await contract.bidPerBlock()).mul(await contract.BONUS_MULTIPLIER()));
  poolStore.lpToken = TOKENS[getChainId()].PRED;
  poolStore.lpTokenPrice = PREDPrice;

  const pool = poolStore.pools[poolStore.currentPool];
  pool.apr = await apr({
    pool, rewardTokenPrice: poolStore.rewardTokenPrice, rewardTokenPerBlock: poolStore.rewardTokenPerBlock,
    lpTokenPrice: poolStore.lpTokenPrice
  });
  if(userAddress){
    pool.earned = toNumberLib(await contract.pendingBID(poolStore.currentPool, userAddress))
    pool.$Earned = pool.earned.times(poolStore.rewardTokenPrice);
    pool.lostRound = await contract.lostRound(userAddress, pool.round);
  }

  return poolStore;
}

export const initWinnerPool = async ({contract, userAddress}: {contract: WinnerPrediction, userAddress: string}): 
  Promise<Omit<PredictionPoolStore, "available" | "isLoading" | "pastPools">> => {
  PREDPrice = !PREDPrice ? await getPREDPrice(contract.provider): PREDPrice;
  const poolStore = await init({contract, userAddress, PREDPrice}) as PredictionPoolStore;
  poolStore.rewardToken = TOKENS[getChainId()].PRED;
  poolStore.rewardTokenPrice = PREDPrice;
  poolStore.rewardTokenPerBlock = toNumberLib((await contract.predPerBlock()).mul(await contract.BONUS_MULTIPLIER()));
  
  poolStore.lpToken = TOKENS[getChainId()].PRED;
  poolStore.lpTokenPrice = PREDPrice;
  
  const pool = poolStore.pools[poolStore.currentPool];

  pool.apr = await apr({
    pool, rewardTokenPrice: PREDPrice, 
    rewardTokenPerBlock: poolStore.rewardTokenPerBlock,
    lpTokenPrice: poolStore.lpTokenPrice
  });
  if(userAddress){
    pool.earned = toNumberLib(await contract.pendingPred(poolStore.currentPool, userAddress));
    pool.$Earned = pool.earned.times(PREDPrice);
    pool.wonRound = await contract.wonRound(userAddress, pool.round);
  }

  return poolStore
}
