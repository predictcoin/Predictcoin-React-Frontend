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
	address: string
}> = [
	{
		id: 'bitcoin',
		value: 'BTC',
		label: CoinTabValue({ label: 'BTC', logo: FaBitcoin }),
		address: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
	},
	{
		id: 'ethereum',
		value: 'ETH',
		label: CoinTabValue({ label: 'ETH', logo: FaEthereum }),
		address: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a"
	},
	{
		id: 'litecoin',
		value: 'LTC',
		label: CoinTabValue({ label: 'LTC', logo: SiLitecoin }),
		address: "0xC14103C2141E842e228FBaC594579e798616ce7A"
	},
	{
		id: 'dogecoin',
		value: 'DOGE',
		label: CoinTabValue({ label: 'DOGE', logo: SiDogecoin }),
		address: "0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396"
	},
	{
		id: 'crypto-com-chain',
		value: 'CRO',
		label: CoinTabValue({ label: 'CRO', logo: SiLitecoin }),
		address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
	},
];
