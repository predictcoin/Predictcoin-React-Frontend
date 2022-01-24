import { useDispatch, useSelector } from "react-redux";
import { PredictionStore } from "../../../application/domain/prediction/predictionStore";
import { AppRootState } from "./index";
import { walletSelector } from "./wallet";
import { 
  getPastRounds as getPastRoundsAction, 
  getPrediction as getPredictionAction 
} from "../actions/prediction";
import { useCallback } from "react";

const predictionSelector = (state: AppRootState) => state.prediction;

export const usePredictionStore = (): PredictionStore => {
  const{
    available, 
    prediction, 
    isLoadingPast, 
    isLoadingCurrent, 
    pastAvailable, 
    pastRounds, 
    hasBet,
    currentRound
  } = useSelector(predictionSelector);

  const walletStore = useSelector(walletSelector);
  const dispatch = useDispatch();
  
  const getPastRounds = useCallback(() => getPastRoundsAction(walletStore)(dispatch), [dispatch, walletStore])

  const getPrediction = useCallback(() => getPredictionAction(walletStore)(dispatch), [dispatch, walletStore])


  return{
    available,
    prediction,
    isLoadingCurrent,
    isLoadingPast,
    pastAvailable,
    pastRounds,
    hasBet,
    currentRound,

    getPastRounds,
    getPrediction
  }
}