import { STAKING_ADDRESSES } from "../../constants/addresses";
import useTransaction from "../../hooks/useTransaction";
import { useStakingStore } from "../infrastructure/redux/stores/staking";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  initStaking as initStakingAction,
  initFarming as initFarmingAction, 
  getStakePool as getStakePoolAction,
  getFarmPool as getFarmPoolAction,
  getUserPoolDetails as getUserPoolDetailsAction
} from "../../application/infrastructure/redux/actions/staking";
import { useWalletViewModel } from "./walletViewModel";
import { Staking__factory } from "../../typechain";
import { getTokenName } from "../../lib/utils/token";
import { farmingTokenData, stakedTokenData } from "../../lib/data/staking";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import { displayDecimals } from "../../lib/utils/number";
import { utils } from "ethers";
import { StakingCardModel } from "../../models/StakingCardModel";
import FarmingCardModel from "../../models/FarmingCardModel";
import {stake as stakeUsecase, unstake as unstakeUsecase, compound as compoundUsecase, harvest as harvestUsecase} from "../usecases/staking/others";
import { watchEvent } from "../../lib/utils/event";

export enum WalletStatus {
	unlocked = 'unlocked',
	locked = 'locked',
}

let watchingFarming = false; // watching events check
let watchingStaking = false; // watching events check

const chainId = getChainId();
export const useStakingViewModel = () => {
  const stakingStore = useStakingStore();
  const {staking, pools, farming, farmingAvailable, stakingAvailable, isLoadingFarming, isLoadingStaking} = stakingStore;
 	const { provider, active, address, signer} = useWalletViewModel();
  const contract = Staking__factory.connect( 
    STAKING_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof STAKING_ADDRESSES],
    signer ? signer : provider 
  );
  const dispatch = useDispatch();
  const {send} = useTransaction();


  const deposit = () => {}
  const withdraw = () => {}

  const compound = (tokenName:string, callbacks?: {[key: string]: () => void}) => 
    compoundUsecase({contract, callbacks, send, tokenName})
  const harvest = (pId: number, tokenName: string, callbacks?: {[key: string]: () => void}) => 
    harvestUsecase({contract, pId, tokenName, send, callbacks});
  const stake = (tokenName:string, pId: number, amount: string, humanAmount: string, callbacks?: {[key: string]: () => void}) => {
    stakeUsecase({contract, pId, tokenName, send, callbacks, amount, humanAmount})
  }
  const unStake = (tokenName:string, pId: number, amount: string, humanAmount: string, callbacks?: {[key: string]: () => void}) => {
    unstakeUsecase({contract, pId, tokenName, send, callbacks, amount, humanAmount})
  }
  
  const handlers = {harvest, compound, deposit, withdraw}

  const stakingCardData = staking?.map((pId, index): StakingCardModel => {
    const pool = pools[pId]
    const { totalStaked, user$Staked, lpTokenDecimals } = pool;
    const buttonClicks = stakedTokenData[pId as keyof typeof stakedTokenData].buttonText
      .map( text => handlers[text.toLowerCase() as keyof typeof handlers]);
    
    return {
      id: pId,
      tokenName: getTokenName(pool.lpToken),
      apr: pool.apr.toString(),
      USDStaked: user$Staked ? user$Staked.toFixed() : "0",
      staked: pool.userStaked ? pool.userStaked.toFixed() : "0",
      earned: pool.earned ? pool.earned?.toFixed() : "0",
      USDEarned: pool.$Earned ?  pool.$Earned?.toFixed() : "0",
      totalStaked: totalStaked.toFixed(),
      walletUnlockStatus: active ? WalletStatus.unlocked : WalletStatus.locked,
      contractUrl: `${Explorers[chainId]}address/${contract.address}`,
      ...stakedTokenData[pId as keyof typeof stakedTokenData],
      buttonClicks,
      decimals: lpTokenDecimals
    }
  });

  const farmingCardData = farming?.map((pId, index): Omit<FarmingCardModel, "harvest"> => {
    const pool = pools[pId]
    const { total$Staked, user$Staked, lpTokenDecimals } = pool;
    
    return {
      id: String(pId),
      tokenName: getTokenName(pool.lpToken),
      apr: pool.apr.toString(),
      USDStaked: user$Staked ? user$Staked.toFixed(): "0",
      staked: pool.userStaked ? pool.userStaked.toFixed() : "0",
      earned: pool.earned ? pool.earned?.toFixed() : "0",
      USDEarned: pool.$Earned ?  pool.$Earned?.toFixed() : "0",
      totalUSDStaked: total$Staked ? total$Staked.toFixed(): "0",
      walletUnlockStatus: active ? WalletStatus.unlocked : WalletStatus.locked,
      contractUrl: `${Explorers[chainId]}address/${contract.address}`,
      ...farmingTokenData[pId as keyof typeof farmingTokenData],
      decimals: lpTokenDecimals,
      tokenPrice: pool.lpTokenPrice?.toFixed() || "0"
    }
  });


  const initStaking = useCallback(() => initStakingAction( contract, address, active )(dispatch), [dispatch, contract, address, active]);
  const initFarming = useCallback(() => initFarmingAction( contract, address, active )(dispatch), [dispatch, contract, address, active]);
  const getStakePool = useCallback((pId: number) => getStakePoolAction(contract, address, pId)(dispatch), [dispatch, contract, address]);
  const getFarmPool = useCallback((pId: number) => getFarmPoolAction(contract, address, pId)(dispatch), [dispatch, contract, address]);
  const getUserPoolDetails = useCallback((pId:number) => getUserPoolDetailsAction(contract, address, pools[pId])(dispatch), [dispatch, contract, pools, address]);

  useEffect(() => {
    if(active && (( stakingAvailable && !isLoadingStaking) || ( farmingAvailable && !isLoadingFarming))){
      for(let id in pools){
        getUserPoolDetails(+id);
      }
    }
  }, [address, active]);

  useEffect(() => {
    if(( stakingAvailable && !isLoadingStaking && !watchingStaking)){
      contract.removeAllListeners();
      //events
      watchEvent(contract, "Deposit", [], (user, pid, amount, event) => {
        if(staking.indexOf(pid.toNumber())  === -1) return;
        getStakePool(pid.toNumber())
      });
      watchEvent(contract, "Withdraw", [], (user, pid, amount, event) => {
        if(staking.indexOf(pid.toNumber())  === -1) return;
        getStakePool(pid.toNumber())
      });
      watchingStaking = true;
    }
    
    return () => {
      contract.removeAllListeners();
    }
  }, [stakingAvailable]);

  useEffect(() => {
    if(( farmingAvailable && !isLoadingFarming && !watchingFarming)){
      contract.removeAllListeners();
      //events
      watchEvent(contract, "Deposit", [], (user, pid, amount, event) => {
        if(farming.indexOf(pid.toNumber())  === -1) return;
        getFarmPool(pid.toNumber())
      });
      watchEvent(contract, "Withdraw", [], (user, pid, amount, event) => {
        if(farming.indexOf(pid.toNumber())  === -1) return;
        getFarmPool(pid.toNumber())
      });
      watchingFarming = true;
    }
    return () => {
      contract.removeAllListeners();
    }
  }, [farmingAvailable]);

  //watch Events
  

  return{
    ...stakingStore,
    initStaking,
    initFarming,
    stakingCardData,
    farmingCardData,
    harvest,
    compound,
    stake,
    unStake
  }
}
