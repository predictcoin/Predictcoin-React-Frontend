import { ERC20__factory, Staking } from "../../../typechain"
import { StakingStore } from "../../domain/staking/stakingStore"
import { Pool } from "../../domain/staking/entity"
import {stakingPools, farmingPools} from "../../domain/staking/stakingStore";
import BigNumber from "bignumber.js";
import { getPREDPrice, getPREDLpTokenPrice } from "../../../lib/utils/price";
import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";

interface initPropsimport
 {
  contract: Staking,
  userAddress?: string,
}

interface StakingAprProps {contract: Staking, pool: Pool, totalAllocPoint: BigNumber}

export const stakingApr = async ({ contract, pool, totalAllocPoint}: StakingAprProps): Promise<BigNumber> => {
  const {totalStaked, allocPoint, } = pool;
  const predPerBlock = toNumberLib((await contract.predPerBlock()).mul(await contract.BONUS_MULTIPLIER()));
  const totalPREDPerYr = predPerBlock.times(28800).times(365);
  const poolPREDPerYr = allocPoint.times(totalPREDPerYr);
  const numerator = poolPREDPerYr.times(100);
  const denominator = totalStaked.times(totalAllocPoint);
  if (denominator.eq(0)) return new BigNumber(0);
  return numerator.div(denominator);
}

export interface FarmingAprProps extends StakingAprProps {
  PREDPrice: BigNumber,
  lpTokenPrice: BigNumber
}

export const farmingApr = async ({contract, pool, totalAllocPoint, PREDPrice, lpTokenPrice}: FarmingAprProps): Promise<BigNumber> => {
  const {totalStaked, allocPoint, } = pool;
  const predPerBlock = toNumberLib((await contract.predPerBlock()).mul(await contract.BONUS_MULTIPLIER()));
  const totalPREDPerYr = predPerBlock.times(28800).times(365);
  const poolPREDPerYr = allocPoint.times(totalPREDPerYr);
  const numerator = poolPREDPerYr.times(PREDPrice).times(100);
  const denominator = totalStaked.times(totalAllocPoint).times(lpTokenPrice);
  return numerator.div(denominator);
}

export const initFarming = async ({contract, userAddress}: initPropsimport): Promise<Omit<StakingStore, "farmingAvailable" | "stakingAvailable" | "isLoadingFarming" | "isLoadingStaking" | "staking">> => {
  const totalAllocPoint = toNumberLib(await contract.totalAllocPoint());
  const pools: {[key: number]: Pool} = {};
  const PREDPrice = await getPREDPrice(contract.provider);

  const getPId_TotalStaked = async (pool: Pool, pId: number) => {
    pool.pId = pId;
    const LpToken = ERC20__factory.connect(pool.lpToken, contract.provider);
    pool.lpTokenDecimals = await LpToken.decimals();
    pool.totalStaked = new BigNumber((await LpToken.balanceOf(contract.address)).toString());
  }

  for(let i=0; i<farmingPools.length; i++){
    const pool: Pool = propertiesToNumberLib(await contract.poolInfo(farmingPools[i])) as Pool;
    await getPId_TotalStaked(pool, farmingPools[i]);
    pool.lpTokenPrice = await getPREDLpTokenPrice(contract.provider, pool.lpToken);
    pool.total$Staked = pool.lpTokenPrice.times(pool.totalStaked);

    pool.apr = await farmingApr({contract, pool, totalAllocPoint, PREDPrice, lpTokenPrice: pool.lpTokenPrice});

    if (userAddress){
      pool.userStaked = toNumberLib((await contract.userInfo(pool.pId, userAddress)).amount);
      pool.user$Staked = pool.lpTokenPrice.times(pool.userStaked);
      pool.earned = toNumberLib(await contract.pendingPred(pool.pId, userAddress));
      pool.$Earned = pool.earned.times(PREDPrice);
    }
    pools[pool.pId] = pool;
  }

  return {
    farming: farmingPools,
    address: contract.address,
    totalAllocPoint,
    pools,
  }
}


export const initStaking = async ({contract, userAddress}: initPropsimport): Promise<Omit<StakingStore,  "farmingAvailable" | "stakingAvailable" | "isLoadingFarming" | "isLoadingStaking" | "farming">> => {
  const totalAllocPoint = toNumberLib(await contract.totalAllocPoint());
  const pools: {[key: number]: Pool} = {};
  const PREDPrice = await getPREDPrice(contract.provider);

  const getPId_TotalStaked = async (pool: Pool, pId: number) => {
    pool.pId = pId;
    const LpToken = ERC20__factory.connect(pool.lpToken, contract.provider);
    pool.lpTokenDecimals = await LpToken.decimals();
    pool.totalStaked = new BigNumber((await LpToken.balanceOf(contract.address)).toString());
  }

  for(let i = 0; i < stakingPools.length; i++){
    const pool: Pool = propertiesToNumberLib(await contract.poolInfo(stakingPools[i])) as Pool;
    await getPId_TotalStaked(pool, stakingPools[i]);
    pool.total$Staked = PREDPrice.times(pool.totalStaked)
    pool.apr = await stakingApr({contract, pool, totalAllocPoint});
    pool.lpTokenPrice = PREDPrice;

    if (userAddress){
      pool.userStaked = new BigNumber((await contract.userInfo(pool.pId, userAddress)).amount.toString());
      pool.user$Staked = PREDPrice.times(pool.userStaked);
      pool.earned = new BigNumber((await contract.pendingPred(pool.pId, userAddress)).toString());
      pool.$Earned = pool.earned.times(PREDPrice);
    }
    pools[pool.pId] = pool;
  }

  return {
    staking: stakingPools,
    address: contract.address,
    totalAllocPoint,
    pools,
  }
}