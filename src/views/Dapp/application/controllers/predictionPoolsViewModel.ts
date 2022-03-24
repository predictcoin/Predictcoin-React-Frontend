import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { LOSER_PREDICTION_POOL_ADDRESSES, WINNER_PREDICTION_POOL_ADDRESSES } from "../../constants/addresses";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import { getTokenName } from "../../lib/utils/token";
import {stake as stakeUsecase, unstake as unstakeUsecase, harvest as harvestUsecase} from "../usecases/staking/others";
import PredictionPoolCardModel from "../../models/PredictionPoolCardModel";
import { LoserPrediction__factory, WinnerPrediction__factory } from "../../typechain";
import { initLoserPool as initLoserPoolAction,
  initWinnerPool as initWinnerPoolAction } from "../infrastructure/redux/actions/predictionPools"
import { useLoserPredictionStore, useWinnerPredictionStore } from "../infrastructure/redux/stores/predictionPools";
import { useWalletViewModel } from "./walletViewModel";
import useTransaction from "../../hooks/useTransaction";

type addressType = keyof typeof LOSER_PREDICTION_POOL_ADDRESSES;
const env: addressType = (process.env.REACT_APP_ENVIRONMENT || "") as addressType;

export const useWinnerPredictionPoolViewModel = () => {
  const dispatch = useDispatch();
  const {address, provider, signer, active} = useWalletViewModel();
  const {send} = useTransaction();


  const store = useWinnerPredictionStore();
  const {currentPool, pools, rewardTokenPrice} = store;

  const winnerContract = WinnerPrediction__factory.connect( 
    WINNER_PREDICTION_POOL_ADDRESSES[env], 
    signer || provider
  );

  const initWinnerPool = useCallback(
    () => initWinnerPoolAction(winnerContract, address, active)(dispatch), 
    [active, address, dispatch, winnerContract]
  );

  let pool = pools[currentPool];
  pool = pool || {}

  const stake = (tokenName:string, amount: string, humanAmount: string, pId?: number,  callbacks?: {[key: string]: () => void}) => {
    // @ts-ignore
    stakeUsecase({contract: winnerContract, pId: currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const unStake = (tokenName:string, amount: string, humanAmount: string, pId?: number, callbacks?: {[key: string]: () => void}) => {
    // @ts-ignore
    unstakeUsecase({contract: winnerContract, pId: pId || currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const harvest = (tokenName: string, pId?: number, callbacks?: {[key: string]: () => void}) => 
    // @ts-ignore
    harvestUsecase({contract: winnerContract, pId: pId || currentPool, tokenName, send, callbacks});

  const winnerCardData: PredictionPoolCardModel = {
    id: currentPool || 0,
    apr: pool.apr?.toFixed() || "0",
    contractUrl: `${Explorers[getChainId()]}address/${winnerContract.address}`,
    wonRound: pool.wonRound,
    round: pool.round,

    stakeToken: "CRP",
    stakeTokenPrice: pool.lpTokenPrice ? pool.lpTokenPrice.toFixed() : "0",
    USDStaked: pool.user$Staked ? pool.user$Staked.toFixed() : "0",
    staked: pool.userStaked ? pool.userStaked.toFixed() : "0",
    total$Staked:pool.total$Staked ? pool.total$Staked?.toFixed() : "0",
    totalStaked:pool.totalStaked ? pool.totalStaked?.toFixed() : "0",
    
    earnToken: "CRP",
    earned: pool.earned?.toFixed() || "0",
    USDEarned:pool.$Earned ? pool.$Earned?.toFixed() : "0",
    earnTokenPrice: rewardTokenPrice?.toFixed() || "0",
  };
    
  return{
    ...store,
    initWinnerPool,
    contract: winnerContract,
    cardData: winnerCardData,
    stake,
    unStake,
    harvest
  }
}

export const useLoserPredictionPoolViewModel = () => {
  const dispatch = useDispatch();
  const {address, provider, signer, active} = useWalletViewModel();
  const store = useLoserPredictionStore();
  const {currentPool, pools, rewardTokenPrice} = store;
  const {send} = useTransaction();

  const loserContract = LoserPrediction__factory.connect( 
    LOSER_PREDICTION_POOL_ADDRESSES[env], 
    signer || provider
  );

  const initLoserPool = useCallback(
    () => initLoserPoolAction(loserContract, address, active)(dispatch), 
    [active, address, dispatch, loserContract]
  );

  let pool = pools[currentPool];
  pool = pool || {};

  const stake = (tokenName:string, amount: string, humanAmount: string, callbacks?: {[key: string]: () => void}) => {
    // @ts-ignore
    stakeUsecase({contract: loserContract, pId: currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const unStake = (tokenName:string, amount: string, humanAmount: string, pId?: number, callbacks?: {[key: string]: () => void}) => {
    // @ts-ignore
    unstakeUsecase({contract: loserContract, pId: pId || currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const harvest = (tokenName: string, pId?: number, callbacks?: {[key: string]: () => void}) => 
  // @ts-ignore
    harvestUsecase({contract: loserContract, pId: pId || currentPool, tokenName, send, callbacks});

  const loserCardData: PredictionPoolCardModel = {
    id: currentPool,
    apr: pool.apr?.toFixed() || "",
    contractUrl: `${Explorers[getChainId()]}address/${loserContract.address}`,
    lostRound: pool.lostRound,
    round: pool.round,

    stakeToken: "CRP",
    stakeTokenPrice: pool.lpTokenPrice ? pool.lpTokenPrice.toFixed() : "0",
    USDStaked: pool.user$Staked ? pool.user$Staked.toFixed() : "0",
    staked: pool.userStaked ? pool.userStaked.toFixed() : "0",
    total$Staked:pool.total$Staked ? pool.total$Staked?.toFixed() : "0",
    totalStaked:pool.totalStaked ? pool.totalStaked?.toFixed() : "0",
    
    earnToken: "MMF",
    earned: pool.earned ?pool.earned?.toFixed() : "0",
    USDEarned:pool.$Earned ? pool.$Earned?.toFixed() : "0",
    earnTokenPrice: rewardTokenPrice?.toFixed() || "0",
  };

  return{
    initLoserPool,
    ...store,
    contract: loserContract,
    cardData: loserCardData,
    stake,
    unStake,
    harvest
  }
}
