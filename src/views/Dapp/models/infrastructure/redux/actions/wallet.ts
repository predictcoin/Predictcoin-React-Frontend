import * as actionTypes from "../actionTypes/wallet";
import { connectWalletParams } from "../../../../application/usecases/wallet/connect";
import { Dispatch } from "react";
import { connect, disconnect } from "../../connectors";

const connectWallet = (name:string) => (dispatch: Dispatch<{type: string, data?: any}>) => {
  dispatch({
    type: actionTypes.CONNECT_WALLET
  });

  return connect(name).then((args) => {
    if(args !== undefined){
      const {chainId, address, explorer, provider} = args;
        provider.on("accountsChanged", ([address]: string[]) => {
          window.location.reload();
          // dispatch({
          //   type: actionTypes.SET_WALLET,
          //   data: {
          //     wallet: {address, provider}
          //   }
          // })
        })
        provider.on("chainsChanged", () => {
          window.location.reload();
        })


        dispatch({
        type: actionTypes.CONNECT_WALLET_SUCCESS,
        data: {
          chainId,
          wallet: {address, provider},
          explorer
        } 
      })
    } else {
      dispatch({
        type: actionTypes.CONNECT_WALLET_FAILED
      })
    }
  })
}

const setWallet = ( params: connectWalletParams ) => (dispatch: Dispatch<{type: string, data:any}>) => {
  dispatch({
    type: actionTypes.SET_WALLET,
    data: params,
  });
}

const disconnectWallet = () => (dispatch: Dispatch<{type: string}>) => {
  dispatch({type: actionTypes.DISCONNECT_WALLET});
  disconnect(); 
}

export {disconnectWallet, connectWallet, setWallet};