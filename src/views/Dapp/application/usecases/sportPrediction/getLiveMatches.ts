import { toUtf8String } from "ethers/lib/utils";
import { SportPrediction } from "../../../typechain"
import { ISportPrediction } from "../../../typechain/SportOracle";
import { LiveMatch } from "../../domain/sportPrediction/entity";
import { SportPredictionStore } from "../../domain/sportPrediction/sportPredictionStore";
import { getMatchFullDetails } from "../sportApi";

interface Params {
    contract: SportPrediction
    dispatch: (data: Pick<SportPredictionStore, "liveMatches">) => void
}

export const getLivematches = async (params: Params): Promise<void> => {
    const {contract, dispatch} = params;

    const liveEvents:ISportPrediction.SportEventStructOutput[] = await contract.getLiveEvents()

    if(liveEvents.length === 0) return dispatch({liveMatches: []})

    const liveEventsdetailsArr = await Promise.all(liveEvents.map(async (match:ISportPrediction.SportEventStructOutput) => {
        return await getMatchFullDetails({
            league: toUtf8String(match.league),
            startTime: match.startTimestamp,
            season: match.season,
            teamA: toUtf8String(match.teamA),
            teamB: toUtf8String(match.teamB)
        })
    }))

    const liveMatches: LiveMatch[] = liveEvents.map((match:ISportPrediction.SportEventStructOutput, index:number):LiveMatch => {
        return {
            id: match.id,
            teamA: liveEventsdetailsArr[index].teams.home.name,
            teamB: liveEventsdetailsArr[index].teams.away.name,
            teamALogoUri: liveEventsdetailsArr[index].teams.home.logo,
            teamBLogoUri: liveEventsdetailsArr[index].teams.away.logo,
            startTimeStamp: Number(match.startTimestamp),
            teamAScore: liveEventsdetailsArr[index].goals.home,
            teamBScore: liveEventsdetailsArr[index].goals.away,
            status: liveEventsdetailsArr[index].fixture.status.long,
            statusShort: liveEventsdetailsArr[index].fixture.status.short,
            startTimestamp: liveEvents[index].startTimestamp.toNumber()
        }
    })

    const sortedLiveMatches = liveMatches.sort((a, b) => b.startTimeStamp - a.startTimeStamp)
    

    dispatch({liveMatches: sortedLiveMatches});
}