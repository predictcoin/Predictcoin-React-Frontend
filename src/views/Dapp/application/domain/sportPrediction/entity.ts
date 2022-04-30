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
    teamALogoUri: string,
    teamBLogoUri: string
}

export interface LiveMatch extends Match {
    startTimeStamp: number;
    teamAScore: number;
    teamBScore: number;
}

export interface UpcomingMatch extends Match {
    time: string;
    date: string
    slotsFilled: number;
}

export interface UserPrediction extends Match {
    time: string;
    date: string
    slotsFilled: number;
    predictedTeamAScore: number,
    predictedTeamBScore: number,
    realTeamAScore: number | undefined,
    realTeamBScore: number | undefined,
    winPercentage?: number,
    lossPercentage?: number,
    teamAPossession?: string,
    teamBPossession?: string,
    outcome: outcome | undefined, // the unknown is to silence the error cause by the switch statement default state that compute the outcome of a match
    status: status | undefined, //same here
    claimed: boolean,
}