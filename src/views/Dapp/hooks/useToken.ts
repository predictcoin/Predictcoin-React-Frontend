import { useWalletViewModel } from "../application/controllers/walletViewModel";
import {ERC20__factory} from "../typechain/factories/ERC20__factory";
import { useEffect, useState } from "react";
import useTransaction from "./useTransaction";
import { BigNumber, ethers } from "ethers";
import { TOKENS } from "../constants/addresses";

interface Token {
  decimals: number,
  approve: (spender: string, amount: string|BigNumber) => Promise<void>,
  getAllowance: (spender:string) => void,
  allowance: BigNumber,
  send: (receiver: string, amount: string|BigNumber) => Promise<void>,
  balance: ethers.BigNumber,
  getSymbol: () => Promise<string>,
  getBalance: () => void
}

const useToken = (address: string): Token => {
  const { provider , signer, address: userAddress, active, chainId} = useWalletViewModel();
  const contract = ERC20__factory.connect(address, signer || provider);
  const {send: sendTransaction} = useTransaction();

  const [decimals, setDecimals] = useState(0);
  const [allowance, setAllowance] = useState(ethers.BigNumber.from(0));
  const [balance, setBalance] = useState(ethers.BigNumber.from(0));
  const [symbol, setSymbol] = useState("");

  

  useEffect(() => {
    if(active){
      (async () => {
        await getDecimals();
        getBalance();
      })();
      
      if(active) getAllowance(userAddress);
    }
  }, [userAddress])

  const getDecimals = async () => {
    if(decimals !== 0) return decimals;
    const result = await contract.decimals();
    setDecimals(result);
  }

  const getSymbol = async () => {
    if(symbol !== "") return symbol;
    const result = await contract.symbol();
    setSymbol(result);
    return result;
  }

  const getAllowance = async (spender: string) => {
    if(!active){
      throw new Error("Please connect your wallet");
    };

    const result = await contract.allowance(userAddress, spender);
    setAllowance(result);
  }

  const getBalance = async () => {
    if(!active){
      throw new Error ("Please connect your wallet");
    }

    const result = await contract.balanceOf(userAddress);
    console.log(result.toString());
    setBalance(result);
  }

  const send = async (receiver: string, amount: string|BigNumber): Promise<void> => {
    const method = contract.transfer;
    const methodParams = [receiver, amount];
    const message = `Send ${amount} ${await getSymbol()}`;
    sendTransaction({method, methodParams, message});
  }

  const approve = async (spender: string, amount: string|BigNumber ):Promise<void> => {
    const method = contract.approve;
    const methodParams = [spender, amount];
    const message = `Approve ${await getSymbol()} to be spent`;
    const callbacks = {successfull: () => getAllowance(spender)}
    await sendTransaction({method, methodParams, message, callbacks});
  }
  
  return{
    getSymbol,
    getBalance,
    decimals,
    getAllowance,
    allowance,
    send,
    approve,
    balance,
  }
}

export default useToken;
