import BigNumber from "bignumber.js";
import { add } from "date-fns";
import { id } from "date-fns/locale";
import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
import { getCRPPrice } from "../../../lib/utils/price";
import { LoserPrediction, WinnerPrediction } from "../../../typechain"
import { PredictionStore } from "../../domain/prediction/predictionStore";
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
  CRPPrice: BigNumber,
  pId: string
}

const initPool = async ({contract, CRPPrice, pId} : initParams): Promise<PredictionPool> => {
  const pool =  propertiesToNumberLib(await contract.poolInfo(pId)) as unknown as PredictionPool;
  pool.lpTokenDecimals = 18;
  pool.round = pool.epoch.toNumber();
  
  pool.totalStaked = pool.amount;
  pool.total$Staked = CRPPrice.times(pool.amount);

  return pool;
}   

export const getLoserPool = async ({contract, pId, pool, address, store}: LoserParams): Promise<PredictionPool> => {
  const CRPPrice = await getCRPPrice(contract.provider);
  if(!pool){
    pool = await initPool({contract, CRPPrice, pId})
  }

  pool.apr = await apr({
    pool, rewardTokenPrice: CRPPrice, rewardTokenPerBlock: store.rewardTokenPerBlock,
    lpTokenPrice: store.lpTokenPrice
  });

  if(address){
    pool.userStaked = toNumberLib((await contract.userInfo(pId, address)).amount);
    pool.user$Staked = CRPPrice.times(pool.userStaked);
    pool.earned = toNumberLib(await contract.pendingRewardToken(store.currentPool, address))
    pool.$Earned = pool.earned.times(CRPPrice);
    pool.lostRound = await contract.lostRound(address, pool.round);
  }
  return pool;
}

export const getWinnerPool = async ({contract, pId, pool, address, store}: WinnerParams): Promise<PredictionPool> => {
  const CRPPrice = await getCRPPrice(contract.provider);
  if(!pool){
    pool = await initPool({contract, CRPPrice, pId})
  }

  pool.apr = await apr({
    pool, rewardTokenPrice: CRPPrice, 
    rewardTokenPerBlock: store.rewardTokenPerBlock,
    lpTokenPrice: store.lpTokenPrice
  });

  if(address){
    pool.userStaked = toNumberLib((await contract.userInfo(pId, address)).amount);
    pool.user$Staked = CRPPrice.times(pool.userStaked);
    pool.earned = toNumberLib(await contract.pendingCRP(store.currentPool, address));
    pool.$Earned = pool.earned.times(CRPPrice);
    pool.wonRound = await contract.wonRound(address, pool.round);
  }
  return pool;
}
