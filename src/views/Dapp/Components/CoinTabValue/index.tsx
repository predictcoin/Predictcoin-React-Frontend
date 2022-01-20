import { FC } from 'react';
import { IconType } from 'react-icons/lib';


import './cointabvalue.styles.scss';

export interface CoinTabValueProps {
	label: string;
	logo: IconType;
}

const CoinTabValue: FC<CoinTabValueProps> = ({ label, logo }) => {
	return (
		<span className='coin__tab__value'>
			{logo({})}
			{label}
		</span>
	);
};

export default CoinTabValue;
