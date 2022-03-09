import { predict as predictUsecase } from "../usecases/prediction.ts/predict";
import { withdraw as withdrawUsecase } from "../usecases/prediction.ts/withdraw";
import { DIRECTION } from "../domain/prediction/entity";
import { PREDICTION_ADDRESSES, PREDICTION_TOKEN_ADDRESSES } from "../../constants/addresses";
import { SendParams } from "../../hooks/useTransaction";
import { usePredictionStore } from "../infrastructure/redux/stores/prediction";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { 
  getPastRounds as getPastRoundsAction, 
  initPrediction as initPredictionAction 
} from "../../application/infrastructure/redux/actions/prediction";
import { useWalletViewModel } from "./walletViewModel";
import { Prediction__factory } from "../../typechain";

export const usePredictionViewModel = () => {
  const predictionStore = usePredictionStore()
	const {chainId, provider, active, address} = useWalletViewModel();
  const dispatch = useDispatch();

  console.log(PREDICTION_ADDRESSES[chainId], provider);
  const contract = Prediction__factory.connect( PREDICTION_ADDRESSES[chainId], provider );
  const predict = (
    token: keyof typeof PREDICTION_TOKEN_ADDRESSES, 
    direction: DIRECTION, 
    send: (params:SendParams) => Promise<void>
  ) => 
    predictUsecase({provider, active, predictionStore, token, direction, send, contract});
  
  const withdraw = () => { withdrawUsecase() }
  
  const getPastRounds = useCallback(() => getPastRoundsAction( contract, address, active )(dispatch), [dispatch, contract, address, active]);

  const initPrediction = useCallback(() => initPredictionAction( contract, address, active )(dispatch), [dispatch, contract, address, active]);

  return{
    ...predictionStore,
    contract: 
    initPrediction,
    getPastRounds,
    predict,
    withdraw
  }
}
