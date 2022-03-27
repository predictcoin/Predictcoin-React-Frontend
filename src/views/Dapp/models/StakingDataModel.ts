interface StakingDataModel {
    stakingRound: string;
    crpStaked: string;
    coinEarnedIcon: string;
    coinEarned: string;
    earned: string;
    poolType: "Loser" | "Winner";
    withdrawn: boolean | null;
    withdraw: () => void
}; 

export default StakingDataModel;