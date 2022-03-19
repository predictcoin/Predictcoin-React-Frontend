import { BigNumber } from "ethers";

export type Pool  = 
[string, BigNumber, BigNumber, BigNumber] & {
      pId: number,
      lpToken: string;
      allocPoint: BigNumber;
      lastRewardBlock: BigNumber;
      accCRPPerShare: BigNumber;
      apr: BigNumber;
      totalStaked: BigNumber;
      userStaked?: BigNumber;
      user$Staked?: BigNumber;
      total$Staked?: BigNumber;
      earned?: BigNumber;
      $Earned?: BigNumber;
      lpTokenPrice?: BigNumber;
    }