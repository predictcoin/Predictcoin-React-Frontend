import { BigNumber } from "ethers";
import { BorrowedNFT } from "./entity";

export interface PredictverseMarketStore {
    predictverseMarketAddress: string;
    predictverseMarketAvailable: boolean;
    isLoadingPredictverseMarket: boolean;
    marketDetails: {
        availableNFTs: {
            [tokenId: number]: BorrowedNFT;
        };
        userBorrowedNFTs: {
            [tokenId: number]: BorrowedNFT;
        };
        userNoOfBorrowedNFTs: number;
        noOfAvailableNFTs: number;
        NFTAddress: string;
        userPREDCollateral: BigNumber;
        singleNFTCollateral: BigNumber;
    };
}
