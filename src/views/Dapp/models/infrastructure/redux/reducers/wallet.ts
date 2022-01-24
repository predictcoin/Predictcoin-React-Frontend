import { WalletStore } from "../../../../application/domain/wallet/walletStore"
import * as actionTypes from "../actionTypes/wallet";

type INITIAL_STATE = Omit<WalletStore, "connect" | "disconnect" | "explorer" | "name" | "chainId">

const initial: INITIAL_STATE = {
  wallet: { address: "", provider: undefined},
  isConnecting: false,
  active: false,
}

export const walletReducer = (state: INITIAL_STATE = initial, action: {type: string, data?: any}) => {
  switch(action.type){
    case actionTypes.CONNECT_WALLET:
      return {...state, isConnecting: true};
    case actionTypes.SET_WALLET:
      return {...state, ...action.data, isConnecting: false}
    case actionTypes.CONNECT_WALLET_SUCCESS:
      return {...state, ...action.data, isConnecting: false, active:true}
    case actionTypes.DISCONNECT_WALLET:
      return {...state, isConnecting: false, active: false}
    default:
      return state
  }
}

