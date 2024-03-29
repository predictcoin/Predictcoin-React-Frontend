import { configureStore } from "@reduxjs/toolkit";
import { PredictionStore } from "../../../domain/prediction/predictionStore";
import {
    LoserPoolStore,
    WinnerPoolStore
} from "../../../domain/predictionPools/predictionPoolsStore";
import { PredictverseStore } from "../../../domain/predictverse/predictverseStore";
import { PredictverseMarketStore } from "../../../domain/predictverseMarket/predictverseMarketStore";
import { SportPredictionStore } from "../../../domain/sportPrediction/sportPredictionStore";
import { StakingStore } from "../../../domain/staking/stakingStore";
import { WalletStore } from "../../../domain/wallet/walletStore";
import { predictionReducer } from "../reducers/prediction";
import {
    loserPoolReducer,
    winnerPoolReducer
} from "../reducers/predictionPools";
import { predictverseReducer } from "../reducers/predictverse";
import { predictverseMarketReducer } from "../reducers/predictverseMarket";
import { sportPredictionReducer } from "../reducers/sportPrediction";
import { stakingReducer } from "../reducers/staking";
import { walletReducer } from "../reducers/wallet";

export interface AppRootState {
    wallet: WalletStore;
    prediction: PredictionStore;
    sportPrediction: SportPredictionStore;
    predictverse: PredictverseStore;
    predictverseMarket: PredictverseMarketStore;
    staking: StakingStore;
    winnerPredictionPool: WinnerPoolStore;
    loserPredictionPool: LoserPoolStore;
}

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        prediction: predictionReducer,
        sportPrediction: sportPredictionReducer,
        predictverse: predictverseReducer,
        predictverseMarket: predictverseMarketReducer,
        staking: stakingReducer,
        winnerPredictionPool: winnerPoolReducer,
        loserPredictionPool: loserPoolReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        })
});
