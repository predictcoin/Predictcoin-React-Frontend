import BigNumber from "bignumber.js";
import { PredictionPool } from "./entity";
export interface PredictionPoolStore {
  address: string,
  pastPools: number[],
  pools: {[key: number]: PredictionPool}, 
  currentPool: number,
  available: boolean,
  isLoading: boolean,
  rewardToken: string,
  rewardTokenPerBlock: BigNumber,
  rewardTokenPrice: BigNumber
}

export interface WinnerPoolStore extends PredictionPoolStore{}

export interface LoserPoolStore extends PredictionPoolStore{}
