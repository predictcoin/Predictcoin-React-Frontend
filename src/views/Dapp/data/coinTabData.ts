import CoinTabDataModel from '../models/CoinDataModel';

const coinTabData: CoinTabDataModel[] = [
	{
		id: 'bitcoin',
		coinName: 'BTC'
	},
	{
		id: 'ethereum',
		coinName: 'ETH',

	},
	{
		id: 'binancecoin',
		coinName: 'BNB',

	},
	{
		id: 'pancakeswap-token',
		coinName: 'CAKE',

	},
	{
		id: 'dogecoin',
		coinName: 'DOGE',

	},
];

export const coinMinMax: {id: string; min: number; max: number}[] = [
	{
		id: 'bitcoin',
		min: 67.81,
		max: 69045
	},
	{
		id: 'ethereum',
		min: 0.432979,
		max: 4878.26
	},
	{
		id: 'bnb',
		min: 0.0398177,
		max: 686.31
	},
	{
		id: 'pancakeswap-token',
		min: 0.194441,
		max: 43.96
	},
	{
		id: 'dogecoin',
		min: 0.0000869,
		max: 0.731578
	},
]

export default coinTabData