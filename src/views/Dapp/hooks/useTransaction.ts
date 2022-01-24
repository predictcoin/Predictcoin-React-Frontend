import { ethers } from "ethers";
import { ReactText, useRef } from "react";
import { toast } from "react-toastify";
import { ToastBody, STATUS, TYPE } from "../Components/Toast";

export interface SendParams {
  method: ethers.ContractFunction,
  message: string,
  methodParams?: any[], 
  callbacks?: {[key: string]: () => void},
}

const useTransaction = () => {
  const pendingToast = useRef("" as ReactText);

  const send = async(params: SendParams) => {
    const {method, message, methodParams, callbacks} = params; 
    const txResponse = (await method(...(methodParams ? methodParams: [])));
    const body = ToastBody(message, STATUS.PENDING, TYPE.TRANSACTION);
    pendingToast.current = toast(body, {autoClose: false});
    const txReceipt = (await txResponse.wait());

    if(txReceipt.status === 1){
      const body = ToastBody(message, STATUS.SUCCESSFULL, TYPE.TRANSACTION)
      toast.dismiss(pendingToast.current);
      toast(body);
      if(callbacks && callbacks["successfull"]){
        callbacks["successfull"]();
      }
    }else{
      const body = ToastBody(message, STATUS.ERROR, TYPE.ERROR)
      toast.dismiss(pendingToast.current);
      toast(body);
      if(callbacks && callbacks["failed"]){
        callbacks["failed"]();
      }
    }
  }

  return { send };
}

export default useTransaction;