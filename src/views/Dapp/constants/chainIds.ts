export const supportedChainIds = {
  Mainnet: 56,
  Testnet: 97,
}

export const currentValidChainIds = process.env.REACT_APP_ENVIRONMENT === "mainnet" ?
  [supportedChainIds.Mainnet] : [supportedChainIds.Testnet];