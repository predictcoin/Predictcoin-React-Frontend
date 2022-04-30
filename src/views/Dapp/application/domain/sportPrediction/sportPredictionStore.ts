import { BigNumber } from "ethers";
import { LiveMatch, outcome, UpcomingMatch, UserPrediction } from "./entity";

export interface SportPredictionStore {
    isLoadingLiveMatches: boolean,
    isLoadingUpcomingMatches: boolean,
    isLoadingUserPastPredictions: boolean,
    predictionAmount: BigNumber,
    rewardMultiplier: number,
    maxPredictions: number,
    selectedMatchId: string | null //the id of an upcoming match opened in a predict modal
    claimModal: {open: boolean, matchId: string},
    liveMatches: {[key: number]: LiveMatch},
    upcomingMatches: {[key: number]: UpcomingMatch},
    userPastPredictions: {[key: number]: UserPrediction},
}