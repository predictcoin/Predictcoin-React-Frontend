import { FC } from 'react';

import SortIcon from '../../../../assets/appSvgs/SortIcon';

type TableHeadProps = {
	title: string;
	arrow?: boolean;
};

const TableHead: FC<TableHeadProps> = ({ title, arrow }) => {
	return (
		<th className='table__head'>
			{title}
			<span>{arrow && <SortIcon />}</span>
		</th>
	);
};

export default TableHead;
