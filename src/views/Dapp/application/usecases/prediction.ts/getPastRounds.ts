import { ethers } from "ethers";
import { PREDICTION_ADDRESSES } from "../../../constants/addresses";
import { Prediction__factory } from "../../../typechain";
import { Round } from "../../domain/prediction/entity";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { WalletStore } from "../../domain/wallet/walletStore";

interface Params {
  walletStore: WalletStore,
}

export const getPastRounds = async (params: Params) => {
  const {walletStore} = params;
  let {wallet: { provider }, chainId} = walletStore;
  provider = new ethers.providers.Web3Provider(provider);
  const contract = Prediction__factory.connect(PREDICTION_ADDRESSES[chainId], provider);

  const length = await contract.currentEpoch();
  let rounds: Round[] = [];

  for(let i=0; length.sub(1).gt(i); i++){
    const round = (await contract.getRound(i)) as unknown as Round;
    rounds.push(round);
  };

  return rounds;
};
