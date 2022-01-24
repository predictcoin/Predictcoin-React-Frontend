import { ethers } from "ethers";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { Prediction__factory } from "../../../typechain";
import { PREDICTION_ADDRESSES,  PREDICTION_TOKEN_ADDRESSES} from "../../../constants/addresses";
import { WalletStore } from "../../domain/wallet/walletStore";
import { SendParams } from "../../../hooks/useTransaction";
import { DIRECTION } from "../../domain/prediction/entity";



interface Params {
  predictionStore: PredictionStore,
  token: keyof typeof PREDICTION_TOKEN_ADDRESSES,
  walletStore: WalletStore
  direction: DIRECTION,
  send: (params: SendParams) => Promise<void>
}

export const predict = (params: Params) => {
  const { predictionStore, walletStore, send, token, direction } = params;
  let {wallet: { provider }, chainId, active} = walletStore;
  provider = new ethers.providers.Web3Provider(provider);

  if(!predictionStore.available) return new Error("Prediction Contract loading");
  if(!active){
    throw new Error("Please connect your wallet");
  };

  const contract = Prediction__factory.connect(PREDICTION_ADDRESSES[chainId], provider);
  const method = direction === DIRECTION.BEAR ? contract.predictBear : contract.predictBull;
  const message = `Predicting ${token} would go ${direction === DIRECTION.BEAR ? "down" : "up"}`;
  const methodParams = [predictionStore.prediction.currentRound, PREDICTION_TOKEN_ADDRESSES[token]];

  send({method, methodParams, message});
};
