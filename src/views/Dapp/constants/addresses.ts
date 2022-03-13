import { supportedChainIds } from "./chainIds"

export const PREDICTION_ADDRESSES = {
  "mainnet" : "0xC80c40C49a66a930ef42652FFCcBE37b5ed43D67",
  "staging": "0x3b4BA9C354376e16a36535Be332CED5a03cE1256",
  "testnet" : "0xB09A1F4ee02a803A6c618aBd7e5F791ca8D9b936"
}

export const PREDICTION_TOKEN_ADDRESSES = {
  CRO: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  BTC: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
  ETH: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
  DOGE:"0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396",
  LTC: "0xC14103C2141E842e228FBaC594579e798616ce7A"
}

export const TOKENS = {
  [supportedChainIds.Mainnet]: {
    CRP: "0x7b8aD6d7560FAcd1959cfb4b4163D7d297c4bFc0"
  },
  [supportedChainIds.Testnet]: {
    CRP: ""
  }
}
