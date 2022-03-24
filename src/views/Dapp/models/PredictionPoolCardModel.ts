export interface PredictionPoolCardModel {
	id: number;
	apr: string;
	contractUrl: string;
	round: number;

	earnToken: string;
	earned: string;
  USDEarned: string;
  earnTokenPrice: string;

  stakeToken: string;
  staked: string;
  USDStaked: string;
  stakeTokenPrice: string,
	totalStaked: string;
	total$Staked: string;
	lostRound?: boolean;
	wonRound?: boolean;
}

export default PredictionPoolCardModel;
