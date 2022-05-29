interface StakingDataModel {
    stakingRound: string;
    predStaked: string;
    coinEarnedIcon: string;
    coinEarned: string;
    earned: string;
    poolType: "Loser" | "Winner";
    withdrawn: boolean | null;
    withdraw: () => void
}; 

export default StakingDataModel;