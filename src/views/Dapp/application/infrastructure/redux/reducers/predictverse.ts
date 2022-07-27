import { PREDICTVERSE_ADDRESSES } from "../../../../constants/addresses";
import * as actionType from "../actionTypes/predictverse";
import { NODE_ENV } from "../../../../hooks/predictverse/useERC721";
import {
    predictversePools,
    PredictverseStore
} from "../../../domain/predictverse/predictverseStore";

const initialState: Pick<
    PredictverseStore,
    | "predictverseAvailable"
    | "isLoadingPredictverse"
    | "pools"
    | "predictverseAddress"
> = {
    predictverseAddress:
        PREDICTVERSE_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as NODE_ENV],
    predictverseAvailable: false,
    isLoadingPredictverse: false,
    pools: {}
};

export const predictverseReducer = (
    state = initialState,
    action: { type: string; data?: any }
) => {
    switch (action.type) {
        case actionType.SET_POOL:
            return {
                ...state,
                pools: {
                    ...state.pools,
                    [action.data.pool.pId]: action.data.pool
                }
            };
        case actionType.INIT_PREDICTVERSE:
            return { ...state, isLoadingPredictverse: true };
        case actionType.INIT_PREDICTVERSE_FAILED:
            return { ...state, isLoadingPredictverse: false };
        case actionType.INIT_PREDICTVERSE_SUCCESS:
            if (
                state.pools[predictversePools[0]]?.userStaked &&
                !action.data?.pools[predictversePools[0]]?.userStaked
            ) {
                return {
                    ...state,
                    predictverseAvailable: true,
                    isLoadingPredictverse: false,
                    ...action.data,
                    pools: { ...state.pools }
                };
            }
            return {
                ...state,
                predictverseAvailable: true,
                isLoadingPredictverse: false,
                ...action.data,
                pools: { ...state.pools, ...action.data?.pools }
            };
        default:
            return state;
    }
};
