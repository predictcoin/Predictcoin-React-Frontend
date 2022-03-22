import { WalletStatus } from "./StakingCardModel";

interface FarmingCardModel {
    id: string;
    tokenName: string;
    tokenMultiple: string;
    apr: string;
    earn: string;
    stake: string;
    earned: string;
    staked: string;
    contractUrl: string;
    USDStaked: string;
    USDEarned: string;
    totalUSDStaked: string;
    walletUnlockStatus: WalletStatus;
    harvest: (..._:any) => any;
    decimals: number;
    tokenPrice: string
};

export default FarmingCardModel;