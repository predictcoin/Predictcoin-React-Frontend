export enum WalletStatus {
	unlocked = 'unlocked',
	locked = 'locked',
}

export interface StakingCardModel {
	id: string;
	tokenName: string;
	tokenMultiple: string;
	aprEarned: string;
	predEarned: string;
	predStaked: string;
	totalStaked: number;
	walletUnlockStatus: WalletStatus.locked | WalletStatus.unlocked;
	buttonText: string[];
	contractUrl: string;
	USDTStaked: number;
}
