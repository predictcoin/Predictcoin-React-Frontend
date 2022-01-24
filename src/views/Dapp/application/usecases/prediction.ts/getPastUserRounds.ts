import { ethers } from "ethers";
import { PREDICTION_ADDRESSES } from "../../../constants/addresses";
import { Prediction__factory } from "../../../typechain";
import { WalletStore } from "../../domain/wallet/walletStore";

interface Params {
  walletStore: WalletStore,
}

export const getPastUserRounds = async (params: Params) => {
  const {walletStore} = params;
  let {wallet: {provider, address: userAddress}, chainId} = walletStore;
  provider = new ethers.providers.Web3Provider(provider);
  const contract = Prediction__factory.connect(PREDICTION_ADDRESSES[chainId], provider);

  const length = await contract.getUserRoundsLength(userAddress);
  let [rounds, betInfos] = await contract.getUserRounds(userAddress, 0, length);

  return [rounds, betInfos];
};
