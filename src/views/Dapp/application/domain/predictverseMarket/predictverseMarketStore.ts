import { BorrowedNFT } from "./entity";

export interface PredictverseMarketStore {
    predictverseMarketAddress: string;
    predictverseMarketAvailable: boolean;
    isLoadingPredictverseMarket: boolean;
    marketDetails: {
        userBorrowedNFTs: {
            [tokenId: number]: BorrowedNFT;
        };
        userNoOfBorrowedNFTs: number;
        NFTsAvailable: number;
        totalPREDCollateral: number;
        NFTAddress: string;
    };
}
