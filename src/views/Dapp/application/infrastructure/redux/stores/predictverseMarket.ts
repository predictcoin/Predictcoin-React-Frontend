import { useSelector } from "react-redux";
import { PredictverseMarketStore } from "../../../domain/predictverseMarket/predictverseMarketStore";
import { AppRootState } from "./index";

const predictverseMarketSelector = (state: AppRootState) =>
    state.predictverseMarket;

export const usePredictverseMarketStore = (): PredictverseMarketStore => {
    const store = useSelector(predictverseMarketSelector);
    return store;
};
