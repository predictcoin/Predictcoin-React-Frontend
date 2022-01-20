interface StakingDataModel {
    stakingRound: string;
    coinStaked: string;
    coinStakedIcon: string;
    predBalance: number;
    earned: number;
    withdrawn: boolean | null;
};

export default StakingDataModel;