import { configureStore } from '@reduxjs/toolkit';
import { PredictionStore } from '../../../domain/prediction/predictionStore';
import { WalletStore } from '../../../domain/wallet/walletStore';
import { predictionReducer } from '../reducers/prediction';
import { walletReducer } from '../reducers/wallet';

export interface AppRootState {
  wallet: WalletStore,
  prediction: PredictionStore
}

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    prediction: predictionReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false
    })
});


