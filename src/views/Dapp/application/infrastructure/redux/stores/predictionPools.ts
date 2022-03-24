import { useSelector } from "react-redux";
import { LoserPoolStore, WinnerPoolStore } from "../../../domain/predictionPools/predictionPoolsStore";
import { AppRootState } from "./index";

const loserSelector = (state: AppRootState) => state.loserPredictionPool;

export const useLoserPredictionStore = (): LoserPoolStore => {
  const store = useSelector(loserSelector);
  return store;
}


const winnerSelector = (state: AppRootState) => state.winnerPredictionPool;

export const useWinnerPredictionStore = (): WinnerPoolStore => {
  const store = useSelector(winnerSelector);
  return store;
}

