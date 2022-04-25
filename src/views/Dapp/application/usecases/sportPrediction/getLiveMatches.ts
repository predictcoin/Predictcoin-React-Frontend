import { SportPrediction } from "../../../typechain"
import { ISportPrediction } from "../../../typechain/SportOracle";
import { LiveMatch } from "../../domain/sportPrediction/entity";
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore";

interface Params {
    contract: SportPrediction
    dispatch: (data: Pick<SportPredictionStore, "liveMatches">) => void
}

export const getLivematches = async (params: Params): Promise<void> => {
    const {contract, dispatch} = params;

    const liveEvents:ISportPrediction.SportEventStructOutput[] = await contract.getLiveEvents()

    console.log("LIVE MATCHES: ", liveEvents);

    // const liveMatches:{[key: number]: LiveMatch} = []

    // liveEvents.forEach(event => {
    //     manipulate each object and push into array above
    // })

    // dispatch({liveMatches});
}