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
		id: 'crypto-com-chain',
		coinName: 'CRO',

	},
	{
		id: 'litecoin',
		coinName: 'LTC',

	},
	{
		id: 'dogecoin',
		coinName: 'DOGE',

	},
];

export const coinMinMax: {id: string; min: number; max: number}[] = [
	{
		id: 'bitcoin',
		min: 5000,
		max: 65000
	},
	{
		id: 'etheruem',
		min: 5000,
		max: 65000
	},
	{
		id: 'crypto-com-chain',
		min: 0.4,
		max: 0.9
	},
	{
		id: 'litecoin',
		min: 5000,
		max: 65000
	},
	{
		id: 'dogecoin',
		min: 5000,
		max: 65000
	},
]

export default coinTabData