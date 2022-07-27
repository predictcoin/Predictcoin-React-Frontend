import { useSelector } from "react-redux";
import { PredictverseStore } from "../../../domain/predictverse/predictverseStore";
import { AppRootState } from "./index";

const predictverseSelector = (state: AppRootState) => state.predictverse;

export const usePredictverseStore = (): PredictverseStore => {
    const store = useSelector(predictverseSelector);
    return store;
};
