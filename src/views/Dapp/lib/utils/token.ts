import { TOKENS,PREDICTION_TOKEN_ADDRESSES } from "../../constants/addresses"
import { getChainId } from "./chain";

export const getTokenName = (address: string) => {
  const entries = Object.entries(TOKENS[getChainId()]);
  
  const [name, ] = entries.filter(([_, _address]) => address === _address)[0];
  return name;
}

export const getTokenAddress = (name: string) => {
  const entries = Object.entries(TOKENS[getChainId()]);
  const [, address] = entries.filter(([_name, _]) => _name === name)[0];
  return address;
}

export const getPredictionTokenName = (address: string) => {
  const entries = Object.entries(PREDICTION_TOKEN_ADDRESSES);
  const [name, ] = entries.filter(([_, _address]) => address === _address)[0];
  return name;
}

export const getPredictionTokenAddress = (name: string) => {
  const entries = Object.entries(PREDICTION_TOKEN_ADDRESSES);
  const [, address] = entries.filter(([_name, _]) => _name === name)[0];
  return address;
}
