export const getChainId = () => {
  return process.env.REACT_APP_ENVIRONMENT === "mainnet" || process.env.REACT_APP_ENVIRONMENT === "staging" ? 56 : 97
}
