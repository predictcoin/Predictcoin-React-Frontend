
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
interface mySportPredictionModel {
    id: string;
    date: string;
    time: string;
    status: status;
    team_one_name: string;
    team_two_name: string;
    team_one_logo_uri: string;
    team_two_logo_uri: string;
    team_one_score?: number;
    team_two_score?: number;
    team_one_possession?: number;
    team_two_possession?: number;
    win_stats: number;
    loss_stats: number;
    outcome: outcome
}

export default mySportPredictionModel;