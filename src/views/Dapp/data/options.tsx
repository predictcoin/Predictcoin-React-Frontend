import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { FaBitcoin } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { SiBinance  } from 'react-icons/si';
import { SiDogecoin } from 'react-icons/si';
import {ReactComponent as PancakeswapCake} from "../../../assets/pics/pancakeswapCake.svg";

import CoinTabValue from '../Components/CoinTabValue';

const CakeIcon = () => {
	return <PancakeswapCake> </PancakeswapCake>;
}

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
		address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
	},
	{
		id: 'ethereum',
		value: 'ETH',
		label: CoinTabValue({ label: 'ETH', logo: FaEthereum }),
		address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
	},
	{
		id: 'binancecoin',
		value: 'BNB',
		label: CoinTabValue({ label: 'BNB', logo: SiBinance }),
		address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
	},
	{
		id: 'dogecoin',
		value: 'DOGE',
		label: CoinTabValue({ label: 'DOGE', logo: SiDogecoin }),
		address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43"
	},
	{
		id: 'pancakeswap-token',
		value: 'CAKE',
		label: CoinTabValue({ label: 'CAKE', logo: CakeIcon as unknown as IconType }),
		address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
	},
];
