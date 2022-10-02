import { Dispatch } from "react";

import * as actionTypes from "../actionTypes/predictverse";
import { Predictverse } from "../../../../typechain";
import { initPredictverseUsecase } from "../../../usecases/predictverse/init";
import { Pool } from "../../../domain/predictverse/entity";
import {
    getPredictversePoolUsecase,
    getUserPoolDetailsUsecase
} from "../../../usecases/predictverse/getPool";

export const initPredictverseAction =
    (predictverseContract: Predictverse, address: string, active: boolean) =>
    async (dispatch: Dispatch<{ type: string; data?: any }>) => {
        dispatch({
            type: actionTypes.INIT_PREDICTVERSE
        });
        try {
            const initState = await initPredictverseUsecase({
                predictverseContract,
                userAddress: address
            });
            dispatch({
                type: actionTypes.INIT_PREDICTVERSE_SUCCESS,
                data: {
                    ...initState
                }
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: actionTypes.INIT_PREDICTVERSE_FAILED
            });
        }
    };

export const getUserPoolDetailsAction =
    (contract: Predictverse, address: string, pool: Pool) =>
    async (dispatch: Dispatch<{ type: string; data?: any }>) => {
        const _pool = await getUserPoolDetailsUsecase({
            contract,
            pool,
            userAddress: address
        });
        dispatch({
            type: actionTypes.SET_POOL,
            data: {
                pool: _pool
            }
        });
    };

export const getPredictversePoolAction =
    (contract: Predictverse, address: string, pId: number) =>
    async (dispatch: Dispatch<{ type: string; data?: any }>) => {
        const _pool = await getPredictversePoolUsecase({
            contract,
            pId,
            userAddress: address
        });
        dispatch({
            type: actionTypes.SET_POOL,
            data: {
                pool: _pool
            }
        });
    };
