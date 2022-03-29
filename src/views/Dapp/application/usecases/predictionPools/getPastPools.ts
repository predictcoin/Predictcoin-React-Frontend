import { propertiesToNumberLib, toNumberLib } from "../../../lib/utils/number";
import { getCRPPrice, getMMFPrice } from "../../../lib/utils/price";
import { LoserPrediction, WinnerPrediction } from "../../../typechain";
import { PredictionPool } from "../../domain/predictionPools/entity";

export const getPastWinnerPools = async ({contract, userAddress, dispatch}: 
  {contract: WinnerPrediction, userAddress: string, dispatch: any}) => {
  const currentPool = toNumberLib(await contract.poolLength()).minus(1).toNumber();
  const CRPPrice = await getCRPPrice(contract.provider);
  for(let i = currentPool-1; i >= 0; i--){
    const pool = propertiesToNumberLib(await contract.poolInfo(i)) as PredictionPool;
    pool.pId = i;
    pool.round = pool.epoch.toNumber();
    pool.totalStaked = pool.amount;
    pool.total$Staked = CRPPrice.times(pool.amount);
    
    if(userAddress){
      pool.userStaked = toNumberLib((await contract.userInfo(i, userAddress)).amount);
      pool.user$Staked = CRPPrice.times(pool.userStaked);
      pool.earned = toNumberLib(await contract.pendingCRP(i, userAddress))
      pool.$Earned = pool.earned.times(CRPPrice);
      pool.lostRound = await contract.lostRound(userAddress, pool.round);
    }

    dispatch({pool});
  }
}


export const getPastLoserPools = async ({contract, userAddress, dispatch}: 
  {contract: LoserPrediction, userAddress: string, dispatch: any}) => {
  const currentPool = toNumberLib(await contract.poolLength()).minus(1).toNumber();
  const CRPPrice = await getCRPPrice(contract.provider);
  const MFFPrice = await getMMFPrice(contract.provider);
  for(let i = currentPool-1; i >= 0; i--){
    console.log("I", i);
    const pool = propertiesToNumberLib(await contract.poolInfo(i)) as PredictionPool;
    pool.pId = i;
    pool.round = pool.epoch.toNumber();
    pool.totalStaked = pool.amount;
    pool.total$Staked = MFFPrice.times(pool.amount);
    
    if(userAddress){
      pool.userStaked = toNumberLib((await contract.userInfo(i, userAddress)).amount);
      pool.user$Staked = MFFPrice.times(pool.userStaked);
      pool.earned = toNumberLib(await contract.pendingRewardToken(i, userAddress))
      pool.$Earned = pool.earned.times(CRPPrice);
      pool.lostRound = await contract.lostRound(userAddress, pool.round);
    }
    dispatch({pool})
  }
}