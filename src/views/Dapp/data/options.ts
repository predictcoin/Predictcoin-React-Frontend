import { ReactElement } from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { SiLitecoin } from 'react-icons/si';
import { SiDogecoin } from 'react-icons/si';

import CoinTabValue from '../Components/CoinTabValue';

export const coinPredictionOptions: Array<{
	id: string;
	value: string;
	label: ReactElement<any, any> | null;
}> = [
	{
		id: 'bitcoin',
		value: 'BTC',
		label: CoinTabValue({ label: 'BTC', logo: FaBitcoin }),
	},
	{
		id: 'ethereum',
		value: 'ETH',
		label: CoinTabValue({ label: 'ETH', logo: FaEthereum }),
	},
	{
		id: 'litecoin',
		value: 'LTC',
		label: CoinTabValue({ label: 'LTC', logo: SiLitecoin }),
	},
	{
		id: 'dogecoin',
		value: 'DOGE',
		label: CoinTabValue({ label: 'DOGE', logo: SiDogecoin }),
	},
	{
		id: 'crypto-com-chain',
		value: 'CRO',
		label: CoinTabValue({ label: 'CRO', logo: SiLitecoin }),
	},
];
