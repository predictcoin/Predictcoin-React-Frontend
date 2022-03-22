import BigNumber from "bignumber.js";
import { Pool } from "../staking/entity";

export interface PredictionPoolStore {
  address: string,
  pastPools: number[],
  pools: {[key: number]: Pool}, 
  currentPool: number,
  totalAllocPoint: BigNumber,
  available: boolean,
  isLoading: boolean,
}

export interface WinnerPredictionPoolStore {
  address: string,
  pastPools: number[]
}