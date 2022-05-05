import { BigNumber } from "ethers";
import { SendParams } from "../../../hooks/useTransaction"
import { SportPrediction } from "../../../typechain"

interface Params {
    active: boolean,
    eventId: string,
    teamAScore: number,
    teamBScore: number,
    teamAName: string,
    teamBName: string,
    contract: SportPrediction
    send: (params: SendParams) => Promise<void>,
    callbacks?: {[key: string]: () => void},
}
export const predict = (params: Params) => {
    const {active, teamAName, teamBName, contract, eventId, send, teamAScore, teamBScore, callbacks} = params;
    if(!active) throw new Error("Please connect your wallet")
    
    const method = contract.predict;
    const message = `Predict ${teamAName} to score ${teamAScore} and ${teamBName} to score ${teamBScore}`

    const methodParams = [eventId, BigNumber.from(teamAScore), BigNumber.from(teamBScore)];
    

    send({method, methodParams, message, callbacks});
}