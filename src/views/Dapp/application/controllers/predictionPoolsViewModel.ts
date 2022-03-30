import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { LOSER_PREDICTION_POOL_ADDRESSES, WINNER_PREDICTION_POOL_ADDRESSES } from "../../constants/addresses";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import {stake as stakeUsecase, unstake as unstakeUsecase, harvest as harvestUsecase} from "../usecases/predictionPools/others";
import PredictionPoolCardModel from "../../models/PredictionPoolCardModel";
import { LoserPrediction__factory, WinnerPrediction__factory } from "../../typechain";
import { initLoserPool as initLoserPoolAction,
  initWinnerPool as initWinnerPoolAction } from "../infrastructure/redux/actions/predictionPools"
import { useLoserPredictionStore, useWinnerPredictionStore } from "../infrastructure/redux/stores/predictionPools";
import { useWalletViewModel } from "./walletViewModel";
import useTransaction from "../../hooks/useTransaction";
import {
  getPastLoserPools as getPastLoserPoolsAction,
  getPastWinnerPools as getPastWinnerPoolsAction,
  getWinnerPool as getWinnerPoolAction,
  getLoserPool as getLoserPoolAction
} from "../infrastructure/redux/actions/predictionPools"
import StakingDataModel from "../../models/StakingDataModel";
import MMF from "../../../../assets/pics/meerkat.png";
import CRP from "../../../../assets/pics/CRP.png"
import BigNumber from "bignumber.js";
import { displayTokenValue } from "../../lib/utils/number";
import { watchEvent } from "../../lib/utils/event";
import { Contract } from "ethers";

type addressType = keyof typeof LOSER_PREDICTION_POOL_ADDRESSES;
const env: addressType = (process.env.REACT_APP_ENVIRONMENT || "") as addressType;

let watchWinner = false, watchLoser = false;

export const useWinnerPredictionPoolViewModel = () => {
  const dispatch = useDispatch();
  const {address, provider, signer, active} = useWalletViewModel();
  const {send} = useTransaction();


  const store = useWinnerPredictionStore();
  const {currentPool, pools, rewardTokenPrice, pastPools} = store;

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

  const stake = useCallback((tokenName:string, amount: string, humanAmount: string, pId?: number,  callbacks?: {[key: string]: () => void}) => {
    stakeUsecase({contract: winnerContract, pId: currentPool, tokenName, send, callbacks, amount, humanAmount})
  }, [currentPool, send, winnerContract] )
  const unStake = useCallback((tokenName:string, amount: string, humanAmount: string, pId?: number, callbacks?: {[key: string]: () => void}) => {
    unstakeUsecase({contract: winnerContract, pId: pId || currentPool, tokenName, send, callbacks, amount, humanAmount}, )
  },[currentPool, send, winnerContract])
  const harvest = useCallback((tokenName: string, pId?: number, callbacks?: {[key: string]: () => void}) => 
    harvestUsecase({contract: winnerContract, pId: pId || currentPool, tokenName, send, callbacks}), [currentPool, send, winnerContract]);
  const getPastWinnerPools = useCallback(() => 
    getPastWinnerPoolsAction(winnerContract, address, active)(dispatch), [active, address, dispatch, winnerContract]);
  const getPastWinnerPool = useCallback((pId: string) => 
    getWinnerPoolAction(winnerContract, pId, address, store, pools[+pId]), [address, pools, store, winnerContract]);

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

  let totalEarnings: BigNumber = new BigNumber(0); 

  const pastWinnerPoolData: StakingDataModel[] = pastPools.map((no): StakingDataModel => {
    const pool = pools[no];
    let withdrawn = null;
    if(pool.userStaked?.gt(0)){
      withdrawn = false;
    }else if(pool.wonRound){
      withdrawn = true;
    }
    totalEarnings = totalEarnings.plus(pool.earned || 0);
    return {
      stakingRound: pool.round.toString(),
      crpStaked: pool.userStaked?.toFixed() || "0",
      coinEarnedIcon: CRP,
      coinEarned: "CRP",
      earned: pool.earned?.toFixed() || "0",
      poolType: "Winner",
      withdrawn,
      withdraw : 
        () => unStake("CRP", pool.userStaked?.toFixed() || "0", 
          displayTokenValue(pool.userStaked?.toFixed() || "0", 18, 5), pool.pId)
    } 
  })  

  useEffect(() => {
    if(!watchWinner && store.available){
      watchEvent(winnerContract, "Deposit", [address], (user, pId) => {
        if(pastPools.indexOf(pId.toNumber()) === -1) return;
        getPastWinnerPool(pId.toString());
      });

      watchEvent(winnerContract, "Withdraw", [address], (user, pId) => {
        if(pastPools.indexOf(pId.toNumber()) === -1) return;
        getPastWinnerPool(pId.toString());
      });
    }
  }, [store.available]);
    
  return{
    ...store,
    initWinnerPool,
    contract: winnerContract,
    cardData: winnerCardData,
    stake,
    unStake,
    harvest,
    getPastWinnerPools,
    pastWinnerPoolData,
    totalEarnings: totalEarnings.toString()
  }
}

export const useLoserPredictionPoolViewModel = () => {
  const dispatch = useDispatch();
  const {address, provider, signer, active} = useWalletViewModel();
  const store = useLoserPredictionStore();
  const {currentPool, pools, rewardTokenPrice, pastPools} = store;
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
    stakeUsecase({contract: loserContract, pId: currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const unStake = (tokenName:string, amount: string, humanAmount: string, pId?: number, callbacks?: {[key: string]: () => void}) => {
    unstakeUsecase({contract: loserContract, pId: pId || currentPool, tokenName, send, callbacks, amount, humanAmount})
  }
  const harvest = (tokenName: string, pId?: number, callbacks?: {[key: string]: () => void}) => 
    harvestUsecase({contract: loserContract, pId: pId || currentPool, tokenName, send, callbacks});
  const getPastLoserPools = () => 
    getPastLoserPoolsAction(loserContract, address, active)(dispatch);
  const getPastLoserPool = useCallback((pId: string) => 
    getLoserPoolAction(loserContract, pId, address, store, pools[+pId]), [address, pools, store, loserContract]);


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


  let totalEarnings: BigNumber = new BigNumber(0);
  const pastLoserPoolData: StakingDataModel[] = pastPools.map((no): StakingDataModel => {
    const pool = pools[no];
    let withdrawn = null;
    if(pool.userStaked?.gt(0)){
      withdrawn = false;
    }else if(pool.lostRound){
      withdrawn = true;
    }
    totalEarnings = totalEarnings.plus(pool.earned || 0);

    return {
      stakingRound: pool.round.toString(),
      crpStaked: pool.userStaked?.toFixed() || "0",
      coinEarnedIcon: MMF,
      coinEarned: "MMF",
      earned: pool.earned?.toFixed() || "0",
      poolType: "Loser",
      withdrawn,
      withdraw : 
        () => unStake("CRP", pool.userStaked?.toFixed() || "0", 
          displayTokenValue(pool.userStaked?.toFixed() || "0", 18, 5), pool.pId)
    } 
  })  

  useEffect(() => {
    if(!watchLoser && store.available){
      watchEvent(loserContract, "Deposit", [address], (user, pId) => {
        if(pastPools.indexOf(pId.toNumber()) === -1) return;
        getPastLoserPool(pId.toString());
      });

      watchEvent(loserContract, "Withdraw", [address], (user, pId) => {
        if(pastPools.indexOf(pId.toNumber()) === -1) return;
        getPastLoserPool(pId.toString());
      });
    }
  }, [store.available]);

  useEffect(() => {
    setInterval(async () => {
      const _currentPool = (await loserContract.getPoolLength()).sub(1);
      if(!_currentPool.eq(currentPool)){
        initLoserPool();
        if(pastPools.length > 0)getPastLoserPools();
      }
    }, 30000);
  }, [] )

  return{
    initLoserPool,
    ...store,
    contract: loserContract,
    cardData: loserCardData,
    stake,
    unStake,
    harvest,
    getPastLoserPools,
    pastLoserPoolData,
    totalEarnings: totalEarnings.toString()
  }
}
