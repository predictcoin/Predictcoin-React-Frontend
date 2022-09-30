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
            console.log(initState, "changed");
            dispatch({
                type: actionTypes.INIT_PREDICTVERSE_MARKET_SUCCESS,
                data: address
                    ? { ...initState }
                    : {
                          marketDetails: {
                              NFTAddress: initState.marketDetails.NFTAddress,
                              availableNFTs:
                                  initState.marketDetails.availableNFTs,
                              noOfAvailableNFTs:
                                  initState.marketDetails.noOfAvailableNFTs,
                              singleNFTCollateral:
                                  initState.marketDetails.singleNFTCollateral
                          }
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
