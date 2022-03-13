export const displayDecimals = (number: string, decimals: number) => {
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