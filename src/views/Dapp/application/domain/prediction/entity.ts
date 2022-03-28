import { BigNumber } from "ethers";
import { Prediction } from "../../../typechain";

export enum PREDICTIONSTATE{
  ROUND_ENDED_SUCCESSFULLY,
  ROUND_ENDED_UNSUCCESSFULLY,
  ROUND_ONGOING,
  BETTING_ONGOING
}

export enum DIRECTION{
  BULL = 0,
  BEAR = 1,
}

export type Round =
[
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  string[],
  BigNumber[],
  BigNumber[],
  BigNumber[]
] & {
  epoch: BigNumber;
  lockedTimestamp: BigNumber;
  closeTimestamp: BigNumber;
  totalAmount: BigNumber;
  oraclesCalled: boolean;
  _tokens: string[];
  lockedPrices: BigNumber[];
  closePrices: BigNumber[];
  bets: BigNumber[];
}
  & {
    user?: Prediction.BetInfoStructOutput,
    bulls: BigNumber[],
    bears: BigNumber[]
  }
;

