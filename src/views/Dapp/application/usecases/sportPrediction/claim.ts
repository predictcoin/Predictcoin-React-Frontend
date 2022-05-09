import { SendParams } from "../../../hooks/useTransaction"
import { SportPrediction } from "../../../typechain"

interface Params {
    active: boolean,
    eventIds: string[],
    contract: SportPrediction
    send: (params: SendParams) => Promise<void>,
    callbacks?: {[key: string]: () => void},
}
export const claim = (params: Params) => {
    const {active, contract, eventIds, send, callbacks} = params;
    if(!active) throw new Error("Please connect your wallet")

    const method = contract.claim;
    let message;
    if(eventIds.length > 1) {
        message = 'Claiming all prediction rewards'
    }else {
        message = 'Claiming prediction reward'
    }

    const methodParams = [eventIds];

    send({method, methodParams, message, callbacks});
}