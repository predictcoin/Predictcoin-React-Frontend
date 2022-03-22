export enum WalletStatus {
	unlocked = 'unlocked',
	locked = 'locked',
}

export interface StakingCardModel {
	id: number;
	tokenName: string;
	tokenMultiple: string;
	apr: string;
	earn: string;
	stake: string;
	totalStaked: string;
	walletUnlockStatus: WalletStatus.locked | WalletStatus.unlocked;
	buttonText: string[];
	contractUrl: string;
	USDStaked: string;
  staked: string;
  earned: string;
  USDEarned: string;
  buttonClicks: ((..._:any)=> any)[];
	decimals: number;
}

export default StakingCardModel;
