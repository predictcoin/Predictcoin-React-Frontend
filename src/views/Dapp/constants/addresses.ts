import { supportedChainIds } from "./chainIds"

export const SPORT_PREDICTION_ADDRESSES = {
  "mainnet": "0xd75067f92079143F6008C3e5A8C399D25533EBF7", 
  "staging": "0xd75067f92079143F6008C3e5A8C399D25533EBF7",
  "testnet": "",
}

export const SPORT_ORACLE_ADDRESSES = {
  "mainnet": "0x785F0184B5439062BE787D5Bb0554C06BF13E17c",
  "staging": "0x785F0184B5439062BE787D5Bb0554C06BF13E17c",
  "testnet": "",
}

export const PREDICTION_ADDRESSES = {
  "mainnet" : "0xBf9C36E0852B62Ac730E6BA8EAa5022Ed97cBBE8",
  "staging": "0xBf9C36E0852B62Ac730E6BA8EAa5022Ed97cBBE8",
  "testnet" : ""
}

export const PANCAKW_ADDRESSES = {
  [supportedChainIds.Mainnet]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  [supportedChainIds.Testnet]: ""
}

export const STAKING_ADDRESSES = {
  "mainnet": "0x4b74C42b7aB96fEec003563c355f2fEfD0C80ee7",
  "staging": "0x4b74C42b7aB96fEec003563c355f2fEfD0C80ee7",
  "testnet": ""
}

export const LOSER_PREDICTION_POOL_ADDRESSES = {
  "mainnet": "0x5D83EF52661Baa67c9a7d60BF61b8339622603B6",
  "staging": "0x5D83EF52661Baa67c9a7d60BF61b8339622603B6"
}

export const WINNER_PREDICTION_POOL_ADDRESSES = {
  "mainnet": "0x29C06EB1320BBc32A6891889A3dF56d8422f5406",
  "staging": "0x29C06EB1320BBc32A6891889A3dF56d8422f5406"
}

export const PREDICTION_TOKEN_ADDRESSES = {
  "BNB": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "ETH": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  "DOGE": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
  "CAKE": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  "BTC": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
}

export const TOKENS = {
  [supportedChainIds.Mainnet]: {
    "PRED": "0xbdD2E3fdb879AA42748E9D47b7359323f226BA22",
    "BUSD": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "Predcoin": "0xbdD2E3fdb879AA42748E9D47b7359323f226BA22",
    "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "BUSD-PRED LP": "0xf38db36c3e1b2a93ba0eda1ee49a86f9cbca6980",
    "BNB-PRED LP": "0x3e4dfc6a8f2f1851b0694592d06de5254afe820d",
    "USDT-PRED LP": "0x47893dc78be9231a031e594eb29636d3fcda09b9",
    "BID": "0xf9C86001C92fE30Be5Aa5eB3EF4cd191eAE205e4",
  },
  [supportedChainIds.Testnet]: {
    "PRED": "",
    "BUSD": "",
    "Predcoin": "",
    "WBNB": "",
    "BUSD-PRED LP": "",
    "BNB-PRED LP": "",
    "USDT-PRED LP": "",
    "BID": "",
  }
}
