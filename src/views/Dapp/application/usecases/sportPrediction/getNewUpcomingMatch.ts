import { toUtf8String } from "ethers/lib/utils";
import { formatMatchUIDate, formatMatchUITime } from "../../../lib/utils/formatMatchUIDateAndTime";
import { SportPrediction } from "../../../typechain";
import { ISportPrediction } from "../../../typechain/SportOracle";
import { UpcomingMatch } from "../../domain/sportPrediction/entity";
import { getMatchFullDetails } from "../sportApi";

interface Params {
    contract: SportPrediction;
    id: string;
    dispatch: (data: UpcomingMatch) => void;
}

export const getNewUpcomingMatch = async (params: Params) => {

    const {contract, id, dispatch} = params

    const MatchEvent:ISportPrediction.SportEventStructOutput[] = await contract.getEvents([id]);
    const predictions:SportPrediction.PredictionStruct[] = await contract.getPredictions(id);

    const matchFullDetails = await getMatchFullDetails({
        league: toUtf8String(MatchEvent[0].league),
        startTime: MatchEvent[0].startTimestamp,
        season: MatchEvent[0].season,
        teamA: toUtf8String(MatchEvent[0].teamA),
        teamB: toUtf8String(MatchEvent[0].teamB)
    });

    const data = {
        id,
        teamA: matchFullDetails.teams.home.name,
        teamB: matchFullDetails.teams.away.name,
        teamALogoUri: matchFullDetails.teams.home.logo,
        teamBLogoUri: matchFullDetails.teams.away.logo,
        date: formatMatchUIDate(
            MatchEvent[0].startTimestamp.toNumber()
        ),
        time: formatMatchUITime(
            MatchEvent[0].startTimestamp.toNumber()
        ),
        slotsFilled: predictions.length,
        startTimestamp: MatchEvent[0].startTimestamp.toNumber()
    }    

    dispatch(data);

}