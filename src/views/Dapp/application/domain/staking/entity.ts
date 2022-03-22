import BigNumber from "bignumber.js";

export type Pool  = 
[string, BigNumber, BigNumber, BigNumber] & {
      pId: number,
      lpToken: string;
      lpTokenDecimals: number;
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