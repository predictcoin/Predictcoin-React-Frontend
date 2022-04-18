import { FC } from 'react';

export type TableRowProps = {
	children: any;
	forTableBody?: boolean;
	onClick?: () => void;
};

const TableRow: FC<TableRowProps> = ({ children, forTableBody, ...props}) => {
	return (
		<tr className='table__row' {...props}>
			{children}

			{/* {forTableBody && <span className='table__row__options'>hello there</span>} */}
		</tr>
	);
};

export default TableRow;
