import { BigNumber } from "ethers";
import { SportPredictionStore } from "../../../domain/sportPrediction/sportPredictionStore";
import * as actionTypes from "../actionTypes/sportPrediction";

const initialState: SportPredictionStore = {
    isLoadingUpcomingMatches: false,
    isLoadingUserPastPredictions: false,
    isloadingLiveMatches: false,
    predictionAmount: BigNumber.from(0),
    maxPredictions: BigNumber.from(0),
    rewardMultiplier: BigNumber.from(0),
    liveMatches: {},
    upcomingMatches: {},
    userPastPredictions: {}
}

export const sportPredictionReducer = (state = initialState, action: {type: string, data?: Partial<SportPredictionStore>}): SportPredictionStore => {
    switch (action.type) {
        case actionTypes.GET_LIVE_MATCHES:
            return {...state, isloadingLiveMatches: true}
        case actionTypes.SET_LIVE_MATCHES:
            return {...state, liveMatches: {...state.liveMatches, ...action.data?.liveMatches}}
        case actionTypes.GET_LIVE_MATCHES_SUCCESS:
            return {...state, isloadingLiveMatches: false}
        case actionTypes.GET_LIVE_MATCHES_FAILED:
            return {...state, isloadingLiveMatches: false}

        case actionTypes.GET_UPCOMING_MATCHES:
            return {...state, isLoadingUpcomingMatches: true}
        case actionTypes.SET_UPCOMING_MATCHES:
            return {...state, upcomingMatches: {...state.upcomingMatches, ...action.data?.upcomingMatches}}
        case actionTypes.GET_UPCOMING_MATCHES_SUCCESS:
            return {...state, isLoadingUpcomingMatches: false}
        case actionTypes.GET_UPCOMING_MATCHES_FAILED:
            return {...state, isLoadingUpcomingMatches: false}

        case actionTypes.GET_USER_PAST_PREDICTIONS:
            return {...state, isLoadingUserPastPredictions: true}
        case actionTypes.SET_USER_PAST_PREDICTIONS:
            return {...state, userPastPredictions: {...state.userPastPredictions, ...action.data?.userPastPredictions}}
        case actionTypes.GET_USER_PAST_PREDICTIONS_SUCCESS:
            return {...state, isLoadingUserPastPredictions: false}
        case actionTypes.GET_USER_PAST_PREDICTIONS_FAILED:
            return {...state, isLoadingUserPastPredictions: false}
        default:
            return state;
    }

}

