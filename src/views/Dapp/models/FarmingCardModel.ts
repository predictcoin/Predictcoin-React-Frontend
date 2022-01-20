interface FarmingCardModel {
    id: string;
    tokenName: string;
    tokenMultiple: string;
    aprEarned: string;
    predEarned: number;
    totalStaked: number;
    contractUrl: string;
    USDTStaked: number;
    ctaType: 'unlock' | 'harvest' | 'approve';
};

export default FarmingCardModel;