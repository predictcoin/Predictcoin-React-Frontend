import { BigNumber as _BigNumber, utils } from "ethers";
import BigNumber from "bignumber.js";

export const displayTokenValue = (number: string, tokenDecimals: number, uiDecimals: number) => {
  return displayDecimals(utils.formatUnits(new BigNumber(number).toFixed(0), tokenDecimals), uiDecimals)
}

export const displayDecimals = (number: string, decimals: number = 5) => {
  let [ wholeNumber, mantissa ] = number.split(".");
  if(!mantissa) return wholeNumber;
  mantissa.split("");
  let _mantissa = [];
  let len = mantissa.length - 1;
  for(let i = 0; i < decimals; i++){
    if(i > len ) break;
    _mantissa[i] = mantissa[i];
  }
  return [wholeNumber, _mantissa.join("")].join(".");
}

export const toNumberLib = (number: _BigNumber) => {
  return new BigNumber(number.toString());
}

export const propertiesToNumberLib = (object: any) => {
  let _object: any = {};
  for(let key in object){
    let value = object[key];
    if (object[key] instanceof _BigNumber){
      value = toNumberLib(object[key]);
    }
    _object[key] = value;
  }

  return _object;
}
