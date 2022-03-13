export const getChainId = () => {
  return process.env.REACT_APP_ENVIRONMENT === "production" || process.env.REACT_APP_ENVIRONMENT === "staging" ? 25 : 338
}
