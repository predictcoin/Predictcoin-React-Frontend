import { SportPrediction } from "../../../typechain"
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore"

interface Params {
    contract: SportPrediction
    address: string,
    dispatch: (data: Pick<SportPredictionStore, "userPastPredictions">) => void
}
export const getUserPastPrediction = async (params: Params) => {
    const {contract, dispatch, address} = params

    const userPrediction:SportPrediction.PredictionStruct[] = await contract.getAllUserPredictions(address)
}