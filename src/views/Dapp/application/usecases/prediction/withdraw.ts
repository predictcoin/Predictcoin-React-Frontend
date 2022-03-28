import { SendParams } from "../../../hooks/useTransaction";
import { Prediction } from "../../../typechain";

interface Params{
  contract: Prediction,
  epochs: string[],
  send: (params: SendParams) => Promise<void>,
  callbacks?: {[key: string]: () => void} 
}

export const withdraw = (params: Params) => {
  const {contract, epochs, callbacks, send} = params;
  const method = contract.claim;
  const message = "Withdrawing tokens from unsuccessful rounds";
  const methodParams = [epochs];

  send({method, methodParams, message, callbacks});
};
