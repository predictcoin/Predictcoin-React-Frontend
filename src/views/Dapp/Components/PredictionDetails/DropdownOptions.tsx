import { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import 'react-dropdown/style.css';

type DropdownOptionsProps = {
	options: Array<{
		id: string;
		value: string;
		label: ReactElement<any, any> | null;
	}>;
	value?: { id: string; value: string; label: ReactElement<any, any> | null };
	onChange: Dispatch<SetStateAction<string>>;
};

const DropdownOptions: FC<DropdownOptionsProps> = ({
	options,
	value,
	onChange,
}) => {
	const changeCard = (value: string) => {
		let id: string;

		switch (value) {
			case 'BTC':
				id = 'bitcoin';
				break;
			case 'ETH':
				id = 'ethereum';
				break;
			case 'LTC':
				id = 'litecoin';
				break;
			case 'CRO':
				id = 'crypto-com-chain';
				break;
			case 'DOGE':
				id = 'dogecoin';
				break;
			default:
				id = '';
				break;
		}

		onChange(id);
	};

	return (
		<div className='dropdown'>
			<Dropdown
				options={options}
				value={value ?? options[0]}
				className={'custom__dropdown'}
				controlClassName='custom__dropdown__control'
				arrowClosed={<RiArrowDownSLine />}
				arrowOpen={<RiArrowUpSLine />}
				onChange={(option: Option) => changeCard(option.value)}
			/>
		</div>
	);
};

export default DropdownOptions;
