import { BigNumber } from "ethers";
import { SportPrediction } from "../../../typechain"
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore";

interface Params {
    contract: SportPrediction
    dispatch: (data: Pick<SportPredictionStore, "maxPredictions" | "predictionAmount" | "rewardMultiplier">) => void
}

export const getSportPredictionData = async (params: Params): Promise<void> => {
    const {contract, dispatch} = params;

    const predictionAmount:BigNumber = await contract.predictAmount()
    const rewardMultiplier:BigNumber = await contract.getMultiplier();
    const maxPredictions:BigNumber = await contract.maxPredictions();

    dispatch({predictionAmount: predictionAmount, rewardMultiplier: Number(rewardMultiplier), maxPredictions: Number(maxPredictions)});
}