import { FC } from 'react';

export type TableRowProps = {
	children: any;
	forTableBody?: boolean;
};

const TableRow: FC<TableRowProps> = ({ children, forTableBody }) => {
	return (
		<tr className='table__row'>
			{children}

			{/* {forTableBody && <span className='table__row__options'>hello there</span>} */}
		</tr>
	);
};

export default TableRow;
