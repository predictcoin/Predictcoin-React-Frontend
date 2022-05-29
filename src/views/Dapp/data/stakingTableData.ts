import StakingDataModel from '../models/StakingDataModel';
import Bitcoin from '../../../assets/pics/Bitcoin.png';

const stakingTableData: StakingDataModel[] = [
	{
		stakingRound: '129073286',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073287',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: true,
		withdraw: () => {}
	},
	{
		stakingRound: '129073288',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: null,
		withdraw: () => {}
	},
	{
		stakingRound: '129073289',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073290',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073291',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073292',
		predStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "BID",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
];

export default stakingTableData;
