import { BigNumber } from "ethers";
import { LiveMatch, UpcomingMatch, UserPrediction } from "./entity";

export interface SportPredictionStore {
    isLoadingLiveMatches: boolean,
    isLoadingUpcomingMatches: boolean,
    isLoadingUserPastPredictions: boolean,
    predictionAmount: BigNumber,
    rewardMultiplier: number,
    maxPredictions: number,
    predictMatchModal: {id: string | null, isFilled: boolean | null}
    claimModal: {open: boolean, matchId: string},
    liveMatches: LiveMatch[],
    upcomingMatches: UpcomingMatch[],
    userPastPredictions: UserPrediction[],
}