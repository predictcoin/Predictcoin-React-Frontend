import { useSelector } from "react-redux";
import { PredictionStore } from "../../../domain/prediction/predictionStore";
import { AppRootState } from "./index";

const predictionSelector = (state: AppRootState) => state.prediction;

export const usePredictionStore = (): PredictionStore => {
  const store = useSelector(predictionSelector);
  return store;
}
