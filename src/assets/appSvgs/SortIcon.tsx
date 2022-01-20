import { FC } from 'react';

const SortIcon: FC = (props) => {
	return (
		<svg
			width={8}
			height={15}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='m7 4.5-3-3-3 3M7 10.5l-3 3-3-3'
				stroke='#37346F'
				strokeWidth={1.5}
			/>
		</svg>
	);
};

export default SortIcon;
