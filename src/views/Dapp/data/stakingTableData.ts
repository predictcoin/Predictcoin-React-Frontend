import StakingDataModel from '../models/StakingDataModel';
import Bitcoin from '../../../assets/pics/Bitcoin.png';

const stakingTableData: StakingDataModel[] = [
	{
		stakingRound: '129073286',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073287',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: true,
		withdraw: () => {}
	},
	{
		stakingRound: '129073288',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: null,
		withdraw: () => {}
	},
	{
		stakingRound: '129073289',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073290',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073291',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
	{
		stakingRound: '129073292',
		crpStaked: "24",
		coinEarnedIcon: Bitcoin,
		coinEarned: "MMF",
		poolType: "Loser",
		earned: "50060",
		withdrawn: false,
		withdraw: () => {}
	},
];

export default stakingTableData;
