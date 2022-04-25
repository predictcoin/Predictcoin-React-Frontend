import { SportPrediction } from "../../../typechain"
import { ISportPrediction } from "../../../typechain/SportOracle";
import { UpcomingMatch } from "../../domain/sportPrediction/entity";
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore";

interface Params {
    contract: SportPrediction
    dispatch: (data: Pick<SportPredictionStore, "upcomingMatches">) => void
}
export const getUpcomingMatches = async (params: Params) => {
    const {contract, dispatch} = params;
    const predictableEvents: ISportPrediction.SportEventStructOutput[] = await contract.getPredictableEvents()

    // const upcomingMatches: {[key: number]: UpcomingMatch} = []

    // predictableEvents.forEach(event => {
    //     // manipulate each events and push into the array above
    // })

    // dispatch({upcomingMatches})


}