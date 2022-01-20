import { ReactElement } from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { SiLitecoin } from 'react-icons/si';

import CoinTabValue, { CoinTabValueProps } from '../Components/CoinTabValue';

export const coinPredictionOptions: Array<{
	value: string;
	label: ReactElement<any, any> | null;
}> = [
	{ value: 'BTC', label: CoinTabValue({ label: 'BTC', logo: FaBitcoin }) },
	{ value: 'ETH', label: CoinTabValue({ label: 'ETH', logo: FaEthereum }) },
	{ value: 'LTC', label: CoinTabValue({ label: 'LTC', logo: SiLitecoin }) },
];
