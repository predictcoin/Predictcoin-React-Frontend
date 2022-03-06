import { useDispatch, useSelector } from "react-redux";
import { PredictionStore } from "../../../domain/prediction/predictionStore";
import { AppRootState } from "./index";
import { walletSelector } from "./wallet";
import { 
  getPastRounds as getPastRoundsAction, 
  initPrediction as initPredictionAction 
} from "../actions/prediction";
import { useCallback } from "react";

const predictionSelector = (state: AppRootState) => state.prediction;

export const usePredictionStore = (): PredictionStore => {
  const store = useSelector(predictionSelector);
  return store;
}