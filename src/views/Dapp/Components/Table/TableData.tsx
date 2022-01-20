import { FC } from 'react';

type TableDataProps = {
	text: string;
	children?: any;
	colSpan?: number
};

const TableData: FC<TableDataProps> = ({ text, children, colSpan }) => {
	return (
		<td className='table__data' colSpan={colSpan ?? 1}>
			{children ?? text}
		</td>
	);
};

export default TableData;
