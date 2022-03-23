import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { LOSER_PREDICTION_POOL_ADDRESSES } from "../../constants/addresses";
import { LoserPrediction__factory } from "../../typechain";
import { initLoserPool as initLoserPoolAction } from "../usecases/predictionPools/init"
import { useWalletViewModel } from "./walletViewModel";

type addressType = keyof typeof LOSER_PREDICTION_POOL_ADDRESSES
const env: addressType = (process.env.REACT_APP_ENVIRONMENT || "") as addressType;

export const usePredictionPoolViewModel = () => {
  const dispatch = useDispatch();
  const {address, provider, signer} = useWalletViewModel();
  const loserContract = LoserPrediction__factory.connect( 
    LOSER_PREDICTION_POOL_ADDRESSES[env], 
    signer || provider);

  initLoserPool = useCallback(() => initLoserPoolAction(loserContract, )(dispatch))
}