import { configureStore } from '@reduxjs/toolkit';
import { PredictionStore } from '../../../domain/prediction/predictionStore';
import { StakingStore } from '../../../domain/staking/stakingStore';
import { WalletStore } from '../../../domain/wallet/walletStore';
import { predictionReducer } from '../reducers/prediction';
import { stakingReducer } from '../reducers/staking';
import { walletReducer } from '../reducers/wallet';

export interface AppRootState {
  wallet: WalletStore,
  prediction: PredictionStore
  staking: StakingStore
}

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    prediction: predictionReducer,
    staking: stakingReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false
    })
});


