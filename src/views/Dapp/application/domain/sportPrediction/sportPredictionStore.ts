import { BigNumber } from "ethers";
import { LiveMatch, UpcomingMatch, UserPrediction } from "./entity";

export interface SportPredictionStore {
    isloadingLiveMatches: boolean,
    isLoadingUpcomingMatches: boolean,
    isLoadingUserPastPredictions: boolean,
    predictionAmount: BigNumber,
    rewardMultiplier: BigNumber,
    maxPredictions: BigNumber,
    liveMatches: {[key: number]: LiveMatch},
    upcomingMatches: {[key: number]: UpcomingMatch},
    userPastPredictions: {[key: number]: UserPrediction},
}