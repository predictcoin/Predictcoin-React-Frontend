import { Prediction, Round } from "./entity";

export interface PredictionStore{
  currentRound: number;
  prediction: Prediction;
  pastRounds: Round[];
  isLoadingCurrent: boolean;
  isLoadingPast: boolean;
  available: boolean;
  pastAvailable: boolean;
  hasBet: boolean;

  // predict: (token: string) => Promise<void>;
  // withdraw: (address: string) => Promise<Round[]>;
  getPastRounds: () => void;
  getPrediction: () => void;
};
