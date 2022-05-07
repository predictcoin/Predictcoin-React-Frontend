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

    try {
      const txResponse = (await method(...(methodParams ? methodParams: [])));
      callbacks && callbacks["sent"] && callbacks["sent"]()
      const body = ToastBody(message, STATUS.PENDING, TYPE.TRANSACTION);
      pendingToast.current = toast(body, {autoClose: false});
      const txReceipt = (await txResponse.wait());

      if(txReceipt.status === 1){
        const body = ToastBody(message, STATUS.SUCCESSFULL, TYPE.SUCCESSFULL)
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
    } catch (error: any) {
      console.error(error)
      if(callbacks && callbacks["failed"]){
        callbacks["failed"]();
      }
        const body = ToastBody(error?.message ? error?.message : message + " errored", STATUS.ERROR, TYPE.ERROR)
        toast.dismiss(pendingToast.current);
        toast(body);
    }
    
  }

  return { send };
}

export default useTransaction;