import { Dispatch } from "react";
import { SportPrediction } from "../../../../typechain";
import * as actionTypes from "../actionTypes/sportPrediction";
import { getLivematches as getLivematchesUseCase } from "../../../usecases/sportPrediction/getLiveMatches";
import { getUpcomingMatches as getUpcomingMatchesUsecase } from "../../../usecases/sportPrediction/getUpcomingMatches";
import { SportPredictionStore } from "../../../domain/sportPrediction/sportPredictionStore";
import { getSportPredictionData as getSportPredictionDataUsecase } from "../../../usecases/sportPrediction/getSportPredictionData";
import { getUserPastPrediction as  getUserPastPredictionUsecase} from "../../../usecases/sportPrediction/getUserPastPrediction";
import { getNewUpcomingMatch as getNewUpcomingMatchUsecase } from "../../../usecases/sportPrediction/getNewUpcomingMatch";
import { UpcomingMatch } from "../../../domain/sportPrediction/entity";

export const getLivematches = (contract: SportPrediction) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
    dispatch({
        type: actionTypes.GET_LIVE_MATCHES
    })

    const _dispatch = (data: Pick<SportPredictionStore, "liveMatches">) => {
            dispatch({
            type: actionTypes.SET_LIVE_MATCHES,
            data
        })
    }

    try {
        await getLivematchesUseCase({contract, dispatch: _dispatch});
        dispatch({
            type: actionTypes.GET_LIVE_MATCHES_SUCCESS
        })
    }catch(err) {
        dispatch({
            type: actionTypes.GET_LIVE_MATCHES_FAILED
        })
    }
}

export const getUpcomingMatches = (contract: SportPrediction) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
    dispatch({
        type: actionTypes.GET_UPCOMING_MATCHES
    })

    const _dispatch = (data: Pick<SportPredictionStore, "upcomingMatches">) => {
        dispatch({
            type: actionTypes.SET_UPCOMING_MATCHES,
            data
        })
    }

    try {
        await getUpcomingMatchesUsecase({contract, dispatch: _dispatch})
        dispatch({
            type: actionTypes.GET_UPCOMING_MATCHES_SUCCESS
        })
    } catch(err) {
        dispatch({
            type: actionTypes.GET_UPCOMING_MATCHES_FAILED
        })
    }
}

export const getUserPastPrediction = (contract: SportPrediction, address: string) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
    dispatch({
        type: actionTypes.GET_USER_PAST_PREDICTIONS
    })

    const _dispatch = (data: any) => {
            dispatch({
            type: actionTypes.SET_USER_PAST_PREDICTIONS,
            data
        })
    }

    try {
        await getUserPastPredictionUsecase({contract, address, dispatch: _dispatch})
       
        dispatch({
            type: actionTypes.GET_USER_PAST_PREDICTIONS_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: actionTypes.GET_USER_PAST_PREDICTIONS_FAILED
        })
    }
}

export const getSportPredicitonData = (contract: SportPrediction) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
    const _dispatch = (data: Pick<SportPredictionStore, "maxPredictions" | "predictionAmount" | "rewardMultiplier">) => {
        dispatch({
            type: actionTypes.SET_SPORT_PREDICTION_DATA,
            data
        })
    }

    try {
        await getSportPredictionDataUsecase({contract, dispatch: _dispatch});
    } catch(err) {
        console.error(err)
    }
}

export const setPredictMatchModal = (matchId: string | null, slotsFilled?: number , maxPredictions?:number) => (dispatch: Dispatch<{type:string, data?: Pick<SportPredictionStore, "predictMatchModal">}>): void => {
    const isFilled = slotsFilled && maxPredictions ? slotsFilled === maxPredictions : null;
    
    dispatch({
        type: actionTypes.SET_PREDICT_MATCH_MODAL,
        data: {predictMatchModal: {id: matchId, isFilled}}
    })
}

export const setClaimModal = (open: boolean, matchId: string) => (dispatch: Dispatch<{type:string, data?: Pick<SportPredictionStore, "claimModal">}>):void => {
    dispatch({
        type: actionTypes.SET_CLAIM_MODAL,
        data: {claimModal: {open, matchId}}
    })
}

export const getNewUpcomingMatch = (contract: SportPrediction, id: string) => async (dispatch: Dispatch<{type:string, data: UpcomingMatch}>) => {
    const _dispatch = (data: UpcomingMatch) => {
        dispatch({
            type: actionTypes.ADD_NEW_UPCOMING_MATCH,
            data
        })
    }

    try {
        await getNewUpcomingMatchUsecase({contract, id, dispatch: _dispatch});
    } catch (error) {
        console.error(error)
    }
}

export const incrementMatchFilledSlots = (id: string) => {
    return {
        type: actionTypes.INCREMENT_MATCH_PREDICTION_FILLED_SLOT,
        data: {id}
    }
}