import { toUtf8String } from "ethers/lib/utils";
import { formatMatchUIDate, formatMatchUITime } from "../../../lib/utils/formatMatchUIDateAndTime";
import { SportPrediction } from "../../../typechain";
import { ISportPrediction } from "../../../typechain/SportOracle";
import {
    UserPrediction,
    outcome,
    status
} from "../../domain/sportPrediction/entity";
import { getMatchFullDetails, getBallPossessions } from "../sportApi";

interface Params {
    contract: SportPrediction;
    address: string;
    dispatch: (data:any) => void;
}
export const getUserPastPrediction = async (params: Params) => {
    
    const { contract, dispatch, address } = params;

    if(!address)
        return dispatch({ userPastPredictions: [] });
        

    // array of user prediction structs
    const userPredictions: SportPrediction.PredictionStruct[] =
        await contract.getAllUserPredictions(address);
        

    // array of ids of events the user predicted on
    let predictedEventsIds = userPredictions.map(
        (prediction: SportPrediction.PredictionStruct) => prediction.eventId
    );

    // for every of the user's event, get a list of all predictions that have been made for that event
    const matchpredictionsList = await Promise.all(
        predictedEventsIds.map(async (eventId) => {
            return await contract.getPredictions(eventId); 
        })
    );

    // function for calculating the percentage of win and loss on a match prediction
    const calculateWinLossPercentage = (
        matchId: string,
        realTeamAScore: number,
        realTeamBScore: number
    ): { win: number; loss: number } => {
        // pull out  the array of the predictions with the index of the id
        const predictionsForTheMatch: SportPrediction.PredictionStruct[] =
            matchpredictionsList[predictedEventsIds.indexOf(matchId)];
        let winCount = 0;

        predictionsForTheMatch.forEach(
            (prediction: SportPrediction.PredictionStruct) => {
                if (
                    prediction.teamAScore === realTeamAScore &&
                    prediction.teamBScore === realTeamBScore
                )
                    winCount++;
            }
        );

        let winPercentage = (winCount / predictionsForTheMatch.length) * 100;

        return { win: winPercentage, loss: 100 - winPercentage };
    };

    // array of the actual sport events user predicted on
    const allPredictedMatches: ISportPrediction.SportEventStructOutput[] =
        await contract.getEvents(predictedEventsIds);


    const getOutcome = (
        outcomeNum: number,
        predictedTeamAScore: number,
        predictedTeamBScore: number,
        realTeamAScore: number,
        realTeamBScore: number
    ): outcome | void => {
        switch (outcomeNum) {
            case 0:
            case 2:
                return outcome.UNDETERMINED;
            case 1:
                if (
                    predictedTeamAScore === realTeamAScore &&
                    predictedTeamBScore === realTeamBScore
                )
                    return outcome.WON;
                else return outcome.LOST;
            default:
                break;
        }
    };

    const getStatus = (
        outcomeNum: number,
        matchStatusShort: string
    ): status | undefined => {
        switch (outcomeNum) {
            case 2:
                return status.CANCELLED;
            case 1:
                return status.PLAYED;
            case 0:
                if (matchStatusShort === "NS")
                    // Not started
                    return status.NOT_STARTED;
                else if (
                    ["1H", "2H", "HT", "ET", "P", "BT", "LIVE"].includes(
                        matchStatusShort
                    )
                )
                    return status.LIVE;
                else return;
            default:
                break;
        }
    };

    const matchDetailsArr = await Promise.all(
        allPredictedMatches.map(async (match) => {
            return await getMatchFullDetails({
                league: toUtf8String(match.league),
                round: toUtf8String(match.round),
                startTime: match.startTimestamp,
                season: match.season,
                teamA: toUtf8String(match.teamA),
                teamB: toUtf8String(match.teamB)
            });
        })
    );

    const possessionsArr = await Promise.all(
        matchDetailsArr.map(async (matchDetail) => {
            return await getBallPossessions(matchDetail.fixture.id);
        })
    );
    

    const data: UserPrediction[] = userPredictions.map(
        (
            prediction: SportPrediction.PredictionStruct,
            index: number
        ): UserPrediction => {
            const { win: winPercentage, loss: lossPercentage } =
                calculateWinLossPercentage(
                    prediction.eventId as string,
                    allPredictedMatches[index].realTeamAScore,
                    allPredictedMatches[index].realTeamBScore
                );
                
                
                
            return {
                id: prediction.eventId as string,
                teamA: matchDetailsArr[index].teams.home.name,
                teamB: matchDetailsArr[index].teams.away.name,
                teamALogoUri: matchDetailsArr[index].teams.home.logo,
                teamBLogoUri: matchDetailsArr[index].teams.away.logo,
                date: formatMatchUIDate(
                    allPredictedMatches[index].startTimestamp.toNumber()
                ),
                time: formatMatchUITime(
                    allPredictedMatches[index].startTimestamp.toNumber()
                ),
                slotsFilled: matchpredictionsList[index].length,
                predictedTeamAScore: Number(prediction.teamAScore),
                predictedTeamBScore: Number(prediction.teamBScore),
                realTeamAScore:
                    allPredictedMatches[index].outcome === 1
                        ? allPredictedMatches[index].realTeamAScore
                        : undefined,
                realTeamBScore:
                    allPredictedMatches[index].outcome === 1
                        ? allPredictedMatches[index].realTeamBScore
                        : undefined,
                winPercentage: winPercentage,
                lossPercentage: lossPercentage,
                teamAPossession: possessionsArr[index].teamA,
                teamBPossession: possessionsArr[index].teamB,
                outcome: getOutcome(
                    allPredictedMatches[index].outcome,
                    Number(userPredictions[index].teamAScore),
                    Number(userPredictions[index].teamBScore),
                    allPredictedMatches[index].realTeamAScore,
                    allPredictedMatches[index].realTeamBScore
                ) as unknown as outcome,
                status: getStatus(
                    allPredictedMatches[index].outcome,
                    matchDetailsArr[index].fixture.status.short
                ) as unknown as status,
                claimed: userPredictions[index].claimed,
                startTimestamp: allPredictedMatches[index].startTimestamp.toNumber()
            };
        }
    );

    // sort in ascending start time order
    const sortedData = data.sort((a,b) => b.startTimestamp - a.startTimestamp)
    

    dispatch({ userPastPredictions: sortedData });
};
