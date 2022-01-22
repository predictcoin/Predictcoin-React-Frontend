import { configureStore } from '@reduxjs/toolkit';
import { WalletStore } from '../../../application/domain/wallet/walletStore';
import { walletReducer } from '../reducers/wallet';

export interface AppRootState {
  wallet: WalletStore
}

export const store = configureStore({
  reducer: {
    wallet: walletReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false
    })
});


