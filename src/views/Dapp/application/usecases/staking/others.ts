import { SendParams } from "../../../hooks/useTransaction";
import { Staking } from "../../../typechain"

interface StakeParams{
  contract: Staking,
  pId: number,
  tokenName: string;
  amount: string;
  humanAmount: string;
  send: (params: SendParams) => Promise<void>,
  callbacks?: {[key: string]: () => void}
}

export const stake = (params: StakeParams) => {
  const {contract, pId, send, tokenName, callbacks, amount, humanAmount} = params;
  const method = contract.deposit;
  const methodParams = [pId, amount];
  const message = `Staking ${humanAmount} ${tokenName} `
  send({method, methodParams, message, callbacks})
}


interface UnstakeParams{
  contract: Staking,
  pId: number,
  tokenName: string;
  amount: string;
  humanAmount: string;
  send: (params: SendParams) => Promise<void>,
  callbacks?: {[key: string]: () => void}
}

export const unstake = (params: UnstakeParams) => {
  const {contract, pId, send, tokenName, callbacks, amount, humanAmount} = params;
  const method = contract.withdraw;
  const methodParams = [pId, amount];
  const message = `Unstaking ${humanAmount} ${tokenName} `
  send({method, methodParams, message, callbacks})
}


interface HarvestParams{
  contract: Staking,
  pId: number,
  tokenName: string;
  send: (params: SendParams) => Promise<void>,
  callbacks?: {[key: string]: () => void}
}

export const harvest = (params: HarvestParams) => {
  const {contract, pId, send, tokenName, callbacks} = params;
  const method = contract.withdraw;
  const methodParams = [pId, 0];
  const message = `Harvesting ${tokenName} earnings`
  send({method, methodParams, message, callbacks})
}


interface CompoundParams{
  contract: Staking,
  tokenName: string;
  send: (params: SendParams) => Promise<void>,
  callbacks?: {[key: string]: () => void}
}

export const compound = (params: CompoundParams) => {
  const {contract, send, tokenName, callbacks } = params;
  const method = contract.compound;
  const message = `Compounding rewards in  ${tokenName} staking pool`
  send({method, message, callbacks})
}