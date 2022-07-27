export enum WalletStatus {
    unlocked = "unlocked",
    locked = "locked"
}

export interface PredictverseCardModel {
    id: number;
    apr: string;
    stakedNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    totalNFTStaked: string;
    walletUnlockStatus: WalletStatus.locked | WalletStatus.unlocked;
    contractUrl: string;
    USDStaked: string;
    staked: string;
    earned: string;
    USDEarned: string;
    NFTAddress: string;
}

export default PredictverseCardModel;
