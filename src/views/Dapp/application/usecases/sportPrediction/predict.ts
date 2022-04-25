import { SendParams } from "../../../hooks/useTransaction"
import { SportPrediction } from "../../../typechain"

interface Params {
    active: boolean,
    eventId: string,
    teamAScore: number,
    teamBScore: number,
    contract: SportPrediction
    send: (params: SendParams) => Promise<void>,
    callbacks?: {[key: string]: () => void},
}
export const predict = (params: Params) => {
    const {active, contract, eventId, send, teamAScore, teamBScore, callbacks} = params;
    if(!active) throw new Error("Please connect your wallet")

    const method = contract.predict;
    const message = `prediction...` // to be well customized later

    const methodParams = [eventId, teamAScore, teamBScore];

    send({method, methodParams, message, callbacks});
}