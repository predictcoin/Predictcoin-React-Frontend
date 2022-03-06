import { predict as predictUsecase } from "../usecases/prediction.ts/predict";
import { withdraw as withdrawUsecase } from "../usecases/prediction.ts/withdraw";
import { DIRECTION } from "../domain/prediction/entity";
import { PREDICTION_TOKEN_ADDRESSES } from "../../constants/addresses";
import { SendParams } from "../../hooks/useTransaction";
import { usePredictionStore } from "../infrastructure/redux/stores/prediction";
import { useWalletStore } from "../infrastructure/redux/stores/wallet";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { 
  getPastRounds as getPastRoundsAction, 
  initPrediction as initPredictionAction 
} from "../../application/infrastructure/redux/actions/prediction";

export const usePredictionViewModel = () => {
  const predictionStore = usePredictionStore()
	const walletStore = useWalletStore();
  const dispatch = useDispatch();

  const predict = (
    token: keyof typeof PREDICTION_TOKEN_ADDRESSES, 
    direction: DIRECTION, 
    send: (params:SendParams) => Promise<void>
  ) => 
    predictUsecase({walletStore, predictionStore, token, direction, send});
  
  const withdraw = () => { withdrawUsecase() }
  
  const getPastRounds = useCallback(() => getPastRoundsAction(walletStore)(dispatch), [dispatch, walletStore])

  const initPrediction = useCallback(() => initPredictionAction(walletStore)(dispatch), [dispatch, walletStore])

  return{
    ...predictionStore,
    initPrediction,
    getPastRounds,
    predict,
    withdraw
  }
}
