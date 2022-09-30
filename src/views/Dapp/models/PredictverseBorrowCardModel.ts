import { BigNumber } from "ethers";

export enum WalletStatus {
    unlocked = "unlocked",
    locked = "locked"
}

export interface PredictverseBorrowCardModel {
    borrowedNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    availableNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    userPREDCollateral: BigNumber;
    noOfAvailableNFTs: number;
    noOfBorrowedNFTs: number;
    walletUnlockStatus: WalletStatus.locked | WalletStatus.unlocked;
    contractUrl: string;
    NFTAddress: string;
    singleNFTCollateral: BigNumber;
}

export default PredictverseBorrowCardModel;
