import { BigNumber } from "ethers";

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

export interface BetInfo {
  token: string,
  amount: string,
  position: DIRECTION
}

export interface Round {
  epoch: BigNumber,
  lockedTimestamp: BigNumber,
  closeTimestamp: BigNumber,
  totalAmount: BigNumber,
  oraclesCalled: boolean,
  _tokens: string[],
  bets: BigNumber[],
  lockedPrices: BigNumber[],
  closePrices: BigNumber[],
  user: BetInfo
}

export interface Prediction {
  state: PREDICTIONSTATE;
  currentRound: BigNumber;
  round: Round;
  betAmount: BigNumber;
  tokenMaxBet: BigNumber;
  intervalSeconds: BigNumber;
  betSeconds: BigNumber;
  bufferSeconds: BigNumber;
}
