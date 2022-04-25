import { BigNumber } from "ethers";
import LiveMatch from "../../../Components/LiveMatches/LiveMatch";

export enum status {
    LIVE = "LIVE",
    PLAYED = "PLAYED",
    NOT_STARTED = "NOT STARTED",
    CANCELLED = "CANCELLED"
}

export enum outcome {
    LOST = "Lost",
    WON = "Won",
    UNDETERMINED = "Undetermined"
}

export interface Match {
    id: string,
    teamA: string, 
    teamB: string,
    league: string,
    round: string,
    startTimestamp: BigNumber,
    endTimestamp: BigNumber,
    season: string,
}

export interface LiveMatch extends Match {}

export interface UpcomingMatch extends Match {}

export interface UserPrediction extends Match {
    slotsFilled: number;
    realTeamAScore?: number,
    realTeamBScore?: number,
    winPercentage?: number,
    lossPercentage?: number,
    teamAPossession?: number,
    teamBPossession?: number,
    outcome: outcome,
    status: status,
    amount: BigNumber,
    reward: BigNumber,
}