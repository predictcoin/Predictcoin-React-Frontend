import FarmingCardModel from "../../models/FarmingCardModel"

export const stakedTokenData = {
  0: {
    tokenMultiple: "10x",
    stake: "CRP",
    earn: "CRP",
    buttonText: ['Harvest', 'Compound'],
  },
}

export const farmingTokenData = {
  1: {
    tokenMultiple: "20x",
    stake: "MMF-CRP LP",
    earn: "CRP",
    ctaType: "harvest" as 'unlock' | 'harvest' | 'approve',
  }
}