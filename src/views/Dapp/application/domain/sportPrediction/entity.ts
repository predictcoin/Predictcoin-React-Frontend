import BigNumber from "bignumber.js";

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
    id: string;
    teamA: string;
    teamB: string;
    teamALogoUri: string;
    teamBLogoUri: string;
    startTimestamp: number;
}

export interface LiveMatch extends Match {
    startTimeStamp: number;
    teamAScore: number;
    teamBScore: number;
    status: string;
    statusShort: string;
}

export interface UpcomingMatch extends Match {
    time: string;
    date: string;
    slotsFilled: number;
}

export interface UserPrediction extends Match {
    time: string;
    date: string;
    slotsFilled: number;
    predictedTeamAScore: number;
    predictedTeamBScore: number;
    realTeamAScore: number | undefined;
    realTeamBScore: number | undefined;
    winPercentage?: number;
    lossPercentage?: number;
    teamAPossession?: string;
    teamBPossession?: string;
    predictionAmount: BigNumber;
    rewardAmount: BigNumber;
    outcome: outcome | undefined;
    status: status | undefined;
    claimed: boolean;
}
