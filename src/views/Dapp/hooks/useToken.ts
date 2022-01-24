import { BigNumber, ethers } from "ethers"
import useProvider from "./useProvider"
import {ERC20__factory} from "../typechain/factories/ERC20__factory";
import { useState } from "react";
import { useWalletStore } from "../models/infrastructure/redux/stores/wallet";
import useTransaction from "./useTransaction";

interface Token {
  getDecimals: () => Promise<number>,
  approve: (spender: string, amount: string) => Promise<void>,
  allowance: (spender:string) => Promise<string>,
  send: (receiver: string, amount: string) => Promise<void>,
  getBalance: () => Promise<string>
  getSymbol: () => Promise<string>
}

const useToken = (address: string): Token => {
  const provider = useProvider();
  const contract = ERC20__factory.connect(address, provider);
  const {send: sendTransaction} = useTransaction();

  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");
  const {wallet: {address: userAddress}, active} = useWalletStore()

  const getDecimals = async () => {
    if(decimals !== 0) return decimals;
    const result = await contract.decimals();
    setDecimals(result);
    return result;
  }

  const getSymbol = async () => {
    if(symbol !== "") return symbol;
    const result = await contract.symbol();
    setSymbol(result);
    return result;
  }

  const allowance = async (spender: string): Promise<string> => {
    if(!active){
      throw new Error("Please connect your wallet");
    };

    const result = await contract.allowance(userAddress, spender);
    return result.toString();
  }

  const getBalance = async (): Promise<string> => {
    if(!active){
      throw new Error ("Please connect your wallet");
    }

    const result = await contract.balanceOf(userAddress);
    return result.toString();
  }

  const send = async (receiver: string, amount: string): Promise<void> => {
    const method = contract.transfer;
    const methodParams = [receiver, amount];
    const message = `Send ${amount} ${await getSymbol()}`;
    sendTransaction({method, methodParams, message});
  }

  const approve = async (spender: string, amount: string):Promise<void> => {
    const method = contract.approve;
    const methodParams = [spender, amount];
    const message = `Approve ${await getSymbol()} to be spent`;
    sendTransaction({method, methodParams, message});
  }
  
  return{
    getSymbol,
    getDecimals,
    allowance,
    send,
    approve,
    getBalance,
  }
}

export default useToken;
