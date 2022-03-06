import { BigNumber } from "ethers";
import { Prediction } from "../../../typechain";
import { PREDICTIONSTATE, Round } from "./entity";

export interface PredictionStore{
  available: boolean,
  state: PREDICTIONSTATE,
  contract: Prediction,
  betAmount: BigNumber,
  tokenMaxBet: BigNumber,
  intervalSeconds: BigNumber,
  betSeconds: BigNumber,
  bufferSeconds: BigNumber,
  userCurrentRound: Prediction.BetInfoStructOutput
  pastUserRounds: [rounds: number[], predictionInfo: Prediction.BetInfoStruct[]]
  currentRound: Round;
  prediction: Prediction;
  pastRounds: Round[];
  isLoadingCurrent: boolean;
  isLoadingPast: boolean;
  pastAvailable: boolean;
  hasBet: boolean;


  // predict: (token: string) => Promise<void>;
  // withdraw: (address: string) => Promise<Round[]>;
  // getPastRounds: () => void;
  // getPrediction: () => void;
};
