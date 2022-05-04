interface UpcomingMatchModel {
    id: string;
    date: string;
    time: string;
    team_one_name: string;
    team_two_name: string;
    team_one_logo_uri: string;
    team_two_logo_uri: string;
    total_slots: number;
    taken_slots: number;
}

export default UpcomingMatchModel;