import { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import 'react-dropdown/style.css';
import { CoinTabValueProps } from '../CoinTabValue';

type DropdownOptionsProps = {
	options: Array<{ value: string; label: ReactElement<any, any> | null }>;
	value?: { value: string; label: ReactElement<any, any> | null };
	// onChange?: Dispatch<SetStateAction<string>>;
};

const DropdownOptions: FC<DropdownOptionsProps> = ({
	options,
	value,
	// onChange,
}) => {
	return (
		<div className='dropdown'>
			<Dropdown
				options={options}
				value={value ?? options[0]}
				className={'custom__dropdown'}
				controlClassName='custom__dropdown__control'
				arrowClosed={<RiArrowDownSLine />}
				arrowOpen={<RiArrowUpSLine />}
				// onChange={(option: Option) =>
				// 	onChange ? onChange(option.value) : null
				// }
			/>
		</div>
	);
};

export default DropdownOptions;
