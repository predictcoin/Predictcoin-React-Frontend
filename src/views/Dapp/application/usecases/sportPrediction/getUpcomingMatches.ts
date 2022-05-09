import { toUtf8String } from "ethers/lib/utils";
import {
    formatMatchUITime,
    formatMatchUIDate
} from "../../../lib/utils/formatMatchUIDateAndTime";
import { SportPrediction } from "../../../typechain";
import { ISportPrediction } from "../../../typechain/SportOracle";
import { UpcomingMatch } from "../../domain/sportPrediction/entity";
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore";
import { getMatchFullDetails } from "../sportApi";
interface Params {
    contract: SportPrediction;
    dispatch: (data: Pick<SportPredictionStore, "upcomingMatches">) => void;
}
export const getUpcomingMatches = async (params: Params) => {
    const { contract, dispatch } = params;
    const predictableEvents: ISportPrediction.SportEventStructOutput[] =
        await contract.getPredictableEvents();
    let EventsSlotsFilled: number[] = await Promise.all(
        predictableEvents.map(async (match) => {
            return (
                await contract.getPredictions(match.id)
            ).length;
        })
    );
    
    
    
    

    Promise.all(
        predictableEvents.map(async (match) => {
            return await getMatchFullDetails({
                league: toUtf8String(match.league),
                round: toUtf8String(match.round),
                startTime: match.startTimestamp,
                season: match.season,
                teamA: toUtf8String(match.teamA),
                teamB: toUtf8String(match.teamB)
            });
        })
    ).then((results: any) => {
        const upcomingMatches: UpcomingMatch[] = results.map(
            (result: any, index: number): UpcomingMatch => {
                return {
                    id: predictableEvents[index].id,
                    teamA: result.teams.home.name,
                    teamB: result.teams.away.name,
                    teamALogoUri: result.teams.home.logo,
                    teamBLogoUri: result.teams.away.logo,
                    date: formatMatchUIDate(
                        predictableEvents[index].startTimestamp.toNumber()
                    ),
                    time: formatMatchUITime(
                        predictableEvents[index].startTimestamp.toNumber()
                    ),
                    slotsFilled: EventsSlotsFilled[index]
                };
            }
        );
        
        dispatch({ upcomingMatches: upcomingMatches.reverse() });
    });
};
