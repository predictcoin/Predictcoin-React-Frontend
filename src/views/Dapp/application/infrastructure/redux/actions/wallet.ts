import * as actionTypes from "../actionTypes/wallet";
import { connectWalletParams, connectWallet } from "../../../usecases/wallet/connect";
import { disconnectWallet } from "../../../usecases/wallet/disconnect";
import { Dispatch } from "react";

const connectWalletAction = (name:string) => async (dispatch: Dispatch<{type: string, data?: any}>) => {
  dispatch({
    type: actionTypes.CONNECT_WALLET
  });

  const walletData = await connectWallet({name});
  if(walletData !== undefined){

    // @ts-ignore
    walletData?.externalProvider?.on("accountsChanged", ([address]: string[]) => {
      if(!address){
        disconnectWalletAction();
        return;
      }
      dispatch({
        type: actionTypes.SET_WALLET,
        data: {
          address, externalProvider: walletData.externalProvider
        }
      })
    });
    // @ts-ignore
    walletData?.externalProvider?.on("chainChanged", () => {
      window.location.reload();
    });

    dispatch({
      type: actionTypes.CONNECT_WALLET_SUCCESS,
      data: {
        ...walletData
      } 
    }
  )} 
  else{
      dispatch({
        type: actionTypes.CONNECT_WALLET_FAILED
      })
  }
}

const setWalletAction = ( params: connectWalletParams ) => (dispatch: Dispatch<{type: string, data:any}>) => {
  dispatch({
    type: actionTypes.SET_WALLET,
    data: params,
  });
}

const disconnectWalletAction = () => (dispatch: Dispatch<{type: string}>) => {
  disconnectWallet(); 
  dispatch({type: actionTypes.DISCONNECT_WALLET});
}

export {disconnectWalletAction, connectWalletAction, setWalletAction};