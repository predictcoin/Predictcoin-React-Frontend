import { BigNumber } from "ethers";
import { Prediction } from "../../../typechain";
import { PREDICTION_TOKEN_ADDRESSES} from "../../../constants/addresses";
import { SendParams } from "../../../hooks/useTransaction";
import { DIRECTION } from "../../domain/prediction/entity";



interface Params {
  token: keyof typeof PREDICTION_TOKEN_ADDRESSES,
  active: boolean,
  direction: DIRECTION,
  send: (params: SendParams) => Promise<void>,
  contract: Prediction,
  available: boolean,
  currentRound: BigNumber | string | number,
  callbacks?: {[key: string]: () => void},
}

export const predict = (params: Params) => {
  const { available, active, contract, send, token, direction, currentRound, callbacks } = params;

  if(!available) return new Error("Prediction Contract not loaded");
  if(!active){
    throw new Error("Please connect your wallet");
  };

  const method = direction === DIRECTION.BEAR ? contract.predictBear : contract.predictBull;
  const message = `Predicting ${token} would go ${direction === DIRECTION.BEAR ? "down" : "up"}`;
  const methodParams = [currentRound, PREDICTION_TOKEN_ADDRESSES[token]];

  send({method, methodParams, message, callbacks});
};
