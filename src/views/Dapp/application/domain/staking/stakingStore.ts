import { BigNumber } from "ethers";
import { Pool } from "./entity";

export const stakingPools = [0];
export const farmingPools = [1]

export interface StakingStore {
  address: string,
  staking: number[],
  farming: number[],
  totalAllocPoint: BigNumber,
  pools: {[key: number]: Pool},
  available: boolean,
  isLoading: boolean
}