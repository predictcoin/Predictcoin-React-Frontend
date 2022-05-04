import { useSelector } from "react-redux";
import { SportPredictionStore } from "../../../domain/sportPrediction/sportPredictionStore";
import { AppRootState } from "./index";

const sportPredictionSelector = (state: AppRootState) => state.sportPrediction;

export const useSportPredictionStore = (): SportPredictionStore => {
  const store = useSelector(sportPredictionSelector);
  return store;
}
