import { Pool } from "../staking/entity";
import BigNumber from "bignumber.js";

export interface PredictionPool extends Omit<Pool, "totalStaked"> {
  round: number;
  totalStaked: BigNumber;
  epoch: BigNumber;
  amount: BigNumber;
  wonRound?: boolean;
  lostRound?: boolean;
}