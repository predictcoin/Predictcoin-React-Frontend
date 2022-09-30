import { Dispatch } from "react";

import * as actionTypes from "../actionTypes/predictverseMarket";
import { PredictverseMarket } from "../../../../typechain";
import { initPredictverseMarketUsecase } from "../../../usecases/predictverseMarket/init";
import { getMarketDetailsUsecase } from "../../../usecases/predictverseMarket/others";

export const initPredictverseMarketAction =
    (
        predictverseMarketContract: PredictverseMarket,
        address: string,
        active: boolean
    ) =>
    async (dispatch: Dispatch<{ type: string; data?: any }>) => {
        dispatch({
            type: actionTypes.INIT_PREDICTVERSE_MARKET
        });
        try {
            const initState = await initPredictverseMarketUsecase({
                predictverseMarketContract,
                userAddress: address
            });
            if (address)
                dispatch({
                    type: actionTypes.INIT_PREDICTVERSE_MARKET_SUCCESS,
                    data: {
                        ...initState
                    }
                });
        } catch (err) {
            console.log(err);
            dispatch({
                type: actionTypes.INIT_PREDICTVERSE_MARKET_FAILED
            });
        }
    };

export const getMarketDetailsAction =
    (contract: PredictverseMarket, address: string) =>
    async (dispatch: Dispatch<{ type: string; data?: any }>) => {
        const _marketDetails = await getMarketDetailsUsecase({
            contract,
            userAddress: address
        });
        dispatch({
            type: actionTypes.SET_MARKET_DETAILS_DATA,
            data: {
                marketDetails: _marketDetails
            }
        });
    };
