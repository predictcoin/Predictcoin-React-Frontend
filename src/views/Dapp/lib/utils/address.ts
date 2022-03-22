export const shortenAddress = (address: string): string => {
  if(!address) return "";
  const addressArr = address.split("");
  addressArr.splice(6,32, "...");
  address = addressArr.join("");
  return address;
}
