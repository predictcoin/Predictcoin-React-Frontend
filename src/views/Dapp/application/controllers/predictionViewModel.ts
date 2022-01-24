import { PredictionStore } from "../domain/prediction/predictionStore";
import { WalletStore } from "../domain/wallet/walletStore";
import { predict as predictUsecase } from "../usecases/prediction.ts/predict";
import { withdraw as withdrawUsecase } from "../usecases/prediction.ts/withdraw";
import { DIRECTION } from "../domain/prediction/entity";
import { PREDICTION_TOKEN_ADDRESSES } from "../../constants/addresses";
import { SendParams } from "../../hooks/useTransaction";

export const predictionViewModel = (walletStore: WalletStore, predictionStore: PredictionStore) => {
  const predict = (
    token: keyof typeof PREDICTION_TOKEN_ADDRESSES, 
    direction: DIRECTION, 
    send: (params:SendParams) => Promise<void>
  ) => 
    predictUsecase({walletStore, predictionStore, token, direction, send});
  
  const withdraw = () => { withdrawUsecase() }

  return{
    ...predictionStore,
    predict,
    withdraw
  }
}