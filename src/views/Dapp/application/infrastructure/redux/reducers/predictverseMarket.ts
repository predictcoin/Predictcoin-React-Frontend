import { PREDICTVERSE_MARKET_ADDRESSES } from "../../../../constants/addresses";
import * as actionType from "../actionTypes/predictverseMarket";
import { NODE_ENV } from "../../../../hooks/predictverse/useERC721";
import { PredictverseMarketStore } from "../../../domain/predictverseMarket/predictverseMarketStore";

const initialState: Pick<
    PredictverseMarketStore,
    | "predictverseMarketAvailable"
    | "isLoadingPredictverseMarket"
    | "predictverseMarketAddress"
    | "marketDetails"
> = {
    predictverseMarketAddress:
        PREDICTVERSE_MARKET_ADDRESSES[
            process.env.REACT_APP_ENVIRONMENT as NODE_ENV
        ],
    predictverseMarketAvailable: false,
    isLoadingPredictverseMarket: false,
    marketDetails: {
        availableNFTs: {},
        userBorrowedNFTs: {},
        userNoOfBorrowedNFTs: 0,
        noOfAvailableNFTs: 0,
        NFTAddress: ""
    }
};

export const predictverseMarketReducer = (
    state = initialState,
    action: { type: string; data?: any }
) => {
    switch (action.type) {
        case actionType.INIT_PREDICTVERSE_MARKET:
            return { ...state, isLoadingPredictverseMarket: true };
        case actionType.INIT_PREDICTVERSE_MARKET_FAILED:
            return { ...state, isLoadingPredictverseMarket: false };
        case actionType.INIT_PREDICTVERSE_MARKET_SUCCESS:
            return {
                ...state,
                predictverseAvailable: true,
                isLoadingPredictverseMarket: false,
                ...action.data
            };
        case actionType.SET_MARKET_DETAILS_DATA:
            return {
                ...state,
                predictverseAvailable: true,
                isLoadingPredictverseMarket: false,
                marketDetails: {
                    ...state.marketDetails,
                    ...action.data
                }
            };
        default:
            return state;
    }
};
