import BigNumber from "bignumber.js";

export interface StakedNFT {
    tokenId: number;
    poolId: number;
    imgUrl: string;
}

export type Pool = [string, BigNumber, BigNumber, BigNumber] & {
    pId: number;
    NFTAddress: string;
    allocPoint: BigNumber;
    lastRewardBlock: BigNumber;
    accPREDPerShare: BigNumber;
    apr: BigNumber;
    stakedNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    totalNFTStaked: number;
    userStaked?: BigNumber;
    user$Staked?: BigNumber;
    userEarnings?: BigNumber;
    $userEarnings?: BigNumber;
};
