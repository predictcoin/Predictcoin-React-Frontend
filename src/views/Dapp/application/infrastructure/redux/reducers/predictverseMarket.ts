import { PREDICTVERSE_MARKET_ADDRESSES } from "../../../../constants/addresses";
import * as actionType from "../actionTypes/predictverseMarket";
import { NODE_ENV } from "../../../../hooks/predictverse/useERC721";
import { PredictverseMarketStore } from "../../../domain/predictverseMarket/predictverseMarketStore";

const initialState: Pick<
    PredictverseMarketStore,
    | "predictverseMarketAvailable"
    | "isLoadingPredictverseMarket"
    | "predictverseMarketAddress"
> = {
    predictverseMarketAddress:
        PREDICTVERSE_MARKET_ADDRESSES[
            process.env.REACT_APP_ENVIRONMENT as NODE_ENV
        ],
    predictverseMarketAvailable: false,
    isLoadingPredictverseMarket: false
};

export const predictverseReducer = (
    state = initialState,
    action: { type: string; data?: any }
) => {
    switch (action.type) {
        case actionType.INIT_PREDICTVERSE_MARKET:
            return { ...state, isLoadingPredictverse: true };
        case actionType.INIT_PREDICTVERSE_MARKET_FAILED:
            return { ...state, isLoadingPredictverse: false };
        case actionType.INIT_PREDICTVERSE_MARKET_SUCCESS:
            return {
                ...state,
                predictverseAvailable: true,
                isLoadingPredictverse: false,
                ...action.data
            };
        case actionType.SET_BORROWED_DATA:
            return {
                ...state,
                predictverseAvailable: true,
                isLoadingPredictverse: false,
                ...action.data
            };
        default:
            return state;
    }
};
