import { useSelector } from "react-redux";
import { StakingStore } from "../../../domain/staking/stakingStore";
import { AppRootState } from "./index";

const stakingSelector = (state: AppRootState) => state.staking;

export const usePredictionStore = (): StakingStore => {
  const store = useSelector(stakingSelector);
  return store;
}