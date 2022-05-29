// import { Pool } from "../../domain/staking/entity";
// import { ERC20__factory, Staking } from "../../../typechain"
// import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
// import { getCRPPrice, getMMFLpTokenPrice } from "../../../lib/utils/price";
// import BigNumber from "bignumber.js"
// import { farmingApr, stakingApr } from "./init";

// interface ParamsA {
//   pool: Pool,
//   contract: Staking,
//   userAddress: string
// }

// export const getUserPoolDetails = async (params: ParamsA): Promise<Pool> => {
//   const {contract, pool, userAddress} = params;
//   pool.userStaked = toNumberLib((await contract.userInfo(pool.pId, userAddress)).amount);
//   pool.user$Staked = pool.lpTokenPrice?.times(pool.userStaked);
//   pool.earned = toNumberLib(await contract.pendingCRP(pool.pId, userAddress));
//   const CRPPrice = await getCRPPrice(contract.provider);
//   pool.$Earned = pool.earned.times(CRPPrice);

//   return pool;
// }

// interface ParamsB {
//   pId: number,
//   contract: Staking,
//   userAddress: string
// }

// export const getFarmPool = async (params: ParamsB): Promise<Pool> => {
//   const {contract, pId, userAddress} = params;
//   let pool: Pool = propertiesToNumberLib((await contract.poolInfo(pId)) as unknown as Pool);
//   pool = {...pool};
//   pool.pId = pId;
//   const LpToken = ERC20__factory.connect(pool.lpToken, contract.provider);
//   pool.lpTokenDecimals = await LpToken.decimals();
//   pool.totalStaked = new BigNumber((await LpToken.balanceOf(contract.address)).toString());
//   pool.lpTokenPrice = await getMMFLpTokenPrice(contract.provider, pool.lpToken);
//   pool.total$Staked = pool.lpTokenPrice.times(pool.totalStaked);
//   const CRPPrice = await getCRPPrice(contract.provider);
//   const totalAllocPoint = toNumberLib(await contract.totalAllocPoint());
//   pool.apr = await farmingApr({contract, pool, totalAllocPoint, CRPPrice, lpTokenPrice: pool.lpTokenPrice});

//   if (userAddress){
//     pool.userStaked = toNumberLib((await contract.userInfo(pool.pId, userAddress)).amount);

//     pool.user$Staked = pool.lpTokenPrice?.times(pool.userStaked);
//     pool.earned = toNumberLib(await contract.pendingCRP(pool.pId, userAddress));
//     pool.$Earned = pool.earned.times(CRPPrice);
//   }

//   return pool;
// }

// export const getStakePool = async (params: ParamsB): Promise<Pool> => {
//   const {contract, pId, userAddress} = params;
//   let pool: Pool = propertiesToNumberLib((await contract.poolInfo(pId)) as unknown as Pool);
//   pool = {...pool};
//   pool.pId = pId;
//   const LpToken = ERC20__factory.connect(pool.lpToken, contract.provider);
//   pool.lpTokenDecimals = await LpToken.decimals();
//   pool.totalStaked = new BigNumber((await LpToken.balanceOf(contract.address)).toString());
//   const CRPPrice = await getCRPPrice(contract.provider);
//   pool.total$Staked = CRPPrice.times(pool.totalStaked)
//   const totalAllocPoint = toNumberLib(await contract.totalAllocPoint());
//   pool.apr = await stakingApr({contract, pool, totalAllocPoint});
//   pool.lpTokenPrice = CRPPrice;

//   if (userAddress){
//     pool.userStaked = toNumberLib((await contract.userInfo(pool.pId, userAddress)).amount);

//     pool.user$Staked = pool.lpTokenPrice?.times(pool.userStaked);
//     pool.earned = toNumberLib(await contract.pendingCRP(pool.pId, userAddress));
//     pool.$Earned = pool.earned.times(CRPPrice);
//   }

//   return pool;
// }


export const a = 0;
