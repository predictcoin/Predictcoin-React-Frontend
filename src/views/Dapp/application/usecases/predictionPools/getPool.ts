import BigNumber from "bignumber.js";
import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
import { getPREDPrice } from "../../../lib/utils/price";
import { LoserPrediction, WinnerPrediction } from "../../../typechain"
import { PredictionPool } from "../../domain/predictionPools/entity"
import { LoserPoolStore, WinnerPoolStore } from "../../domain/predictionPools/predictionPoolsStore";
import { apr } from "./init";

interface Params {
  pId: string,
  address: string,
  pool?: PredictionPool,
}

interface LoserParams extends Params{
  contract: LoserPrediction,
  store: LoserPoolStore,
}

interface WinnerParams extends Params{
  contract: WinnerPrediction,
  store: WinnerPoolStore
}

interface initParams{
  contract: LoserPrediction | WinnerPrediction,
  PREDPrice: BigNumber,
  pId: string
}

const initPool = async ({contract, PREDPrice, pId} : initParams): Promise<PredictionPool> => {
  const pool =  propertiesToNumberLib(await contract.poolInfo(pId)) as unknown as PredictionPool;
  pool.lpTokenDecimals = 18;
  pool.round = pool.epoch.toNumber();
  
  pool.totalStaked = pool.amount;
  pool.total$Staked = PREDPrice.times(pool.amount);

  return pool;
}   

export const getLoserPool = async ({contract, pId, pool, address, store}: LoserParams): Promise<PredictionPool> => {
  const PREDPrice = await getPREDPrice(contract.provider);
  if(!pool){
    pool = await initPool({contract, PREDPrice, pId})
  }

  pool.apr = await apr({
    pool, rewardTokenPrice: PREDPrice, rewardTokenPerBlock: store.rewardTokenPerBlock,
    lpTokenPrice: store.lpTokenPrice
  });

  if(address){
    pool.userStaked = toNumberLib((await contract.userInfo(pId, address)).amount);
    pool.user$Staked = PREDPrice.times(pool.userStaked);
    pool.earned = toNumberLib(await contract.pendingBID(store.currentPool, address))
    pool.$Earned = pool.earned.times(PREDPrice);
    pool.lostRound = await contract.lostRound(address, pool.round);
  }
  return pool;
}

export const getWinnerPool = async ({contract, pId, pool, address, store}: WinnerParams): Promise<PredictionPool> => {
  const PREDPrice = await getPREDPrice(contract.provider);
  if(!pool){
    pool = await initPool({contract, PREDPrice, pId})
  }

  pool.apr = await apr({
    pool, rewardTokenPrice: PREDPrice, 
    rewardTokenPerBlock: store.rewardTokenPerBlock,
    lpTokenPrice: store.lpTokenPrice
  });

  if(address){
    pool.userStaked = toNumberLib((await contract.userInfo(pId, address)).amount);
    pool.user$Staked = PREDPrice.times(pool.userStaked);
    pool.earned = toNumberLib(await contract.pendingPred(store.currentPool, address));
    pool.$Earned = pool.earned.times(PREDPrice);
    pool.wonRound = await contract.wonRound(address, pool.round);
  }
  return pool;
}
