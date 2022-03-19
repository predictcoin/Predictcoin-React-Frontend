import { ERC20__factory, Staking } from "../../../typechain"
import { StakingStore } from "../../domain/staking/stakingStore"
import { Pool } from "../../domain/staking/entity"
import {stakingPools, farmingPools} from "../../domain/staking/stakingStore";
import { BigNumber } from "ethers";
import { getCRPPrice, getMMFLpTokenPrice } from "../../../lib/utils/price";

interface initPropsimport
 {
  contract: Staking,
  userAddress?: string,
}

interface StakingAprProps {contract: Staking, pool: Pool, totalAllocPoint: BigNumber}

const stakingApr = async ({ contract, pool, totalAllocPoint}: StakingAprProps): Promise<BigNumber> => {
  const {totalStaked, allocPoint, } = pool;
  const crpPerBlock = await contract.CRPPerBlock();
  const totalCRPPerYr = crpPerBlock.mul(17280).mul(365);
  const poolCRPPerYr = allocPoint.mul(totalCRPPerYr);
  const numerator = poolCRPPerYr.mul(100);
  const denominator = totalStaked.mul(totalAllocPoint);
  if (denominator.eq(0)) return BigNumber.from(0);
  return numerator.div(denominator);
}

interface FarmingAprProps extends StakingAprProps {
  CRPPrice: BigNumber,
  lpTokenPrice: BigNumber
}

const farmingApr = async ({contract, pool, totalAllocPoint, CRPPrice, lpTokenPrice}: FarmingAprProps): Promise<BigNumber> => {
  const {totalStaked, allocPoint, } = pool;
  const crpPerBlock = await contract.CRPPerBlock();
  const totalCRPPerYr = crpPerBlock.mul(17280).mul(365);
  const poolCRPPerYr = allocPoint.mul(totalCRPPerYr);
  const numerator = poolCRPPerYr.mul(CRPPrice).mul(100);
  const denominator = totalStaked.mul(totalAllocPoint).mul(lpTokenPrice);
  return numerator.div(denominator);

}



export const initStaking = async ({contract, userAddress}: initPropsimport): Promise<Omit<StakingStore, "available" | "isLoading">> => {
  const totalAllocPoint = await contract.totalAllocPoint();
  const pools: {[key: number]: Pool} = {};
  const CRPPrice = await getCRPPrice(contract.provider);

  const getPId_TotalStaked = async (pool: Pool, pId: number) => {
    pool.pId = pId;
    const LpToken = ERC20__factory.connect(pool.lpToken, contract.provider);
    pool.totalStaked = await LpToken.balanceOf(contract.address);
  }

  for(let i = 0; i < stakingPools.length; i++){
    const pool: Pool = await contract.poolInfo(stakingPools[i]) as Pool;
    await getPId_TotalStaked(pool, stakingPools[i]);
    pool.total$Staked = CRPPrice.mul(pool.totalStaked)
    pool.apr = await stakingApr({contract, pool, totalAllocPoint});
    pool.lpTokenPrice = CRPPrice;

    if (userAddress){
      pool.userStaked = (await contract.userInfo(pool.pId, userAddress)).amount;
      pool.user$Staked = CRPPrice.mul(pool.userStaked);
      pool.earned = await contract.pendingCRP(pool.pId, userAddress);
      pool.$Earned = pool.earned.mul(CRPPrice);
    }

    pools[pool.pId] = pool;
  }

  for(let i=0; i<farmingPools.length; i++){
    const pool: Pool = await contract.poolInfo(farmingPools[i]) as Pool;
    await getPId_TotalStaked(pool, farmingPools[i]);
    pool.lpTokenPrice = await getMMFLpTokenPrice(contract.provider, pool.lpToken);
    pool.total$Staked = pool.lpTokenPrice.mul(pool.totalStaked);

    pool.apr = await farmingApr({contract, pool, totalAllocPoint, CRPPrice, lpTokenPrice: pool.lpTokenPrice});

    if (userAddress){
      pool.userStaked = (await contract.userInfo(pool.pId, userAddress)).amount;
      pool.user$Staked = pool.lpTokenPrice.mul(pool.userStaked);
      pool.earned = await contract.pendingCRP(pool.pId, userAddress);
      pool.$Earned = pool.earned.mul(CRPPrice);
    }

    pools[pool.pId] = pool;
  }

  return {
    staking: stakingPools,
    farming: farmingPools,
    address: contract.address,
    totalAllocPoint,
    pools,
  }
}