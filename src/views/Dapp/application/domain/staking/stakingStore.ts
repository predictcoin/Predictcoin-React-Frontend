import { Pool } from "./entity";
import BigNumber from "bignumber.js";

export const stakingPools = [0];
export const farmingPools = [1]

export interface StakingStore {
  address: string,
  staking: number[],
  farming: number[],
  totalAllocPoint: BigNumber,
  pools: {[key: number]: Pool},
  farmingAvailable: boolean,
  stakingAvailable: boolean,
  isLoadingFarming: boolean,
  isLoadingStaking: boolean,
}