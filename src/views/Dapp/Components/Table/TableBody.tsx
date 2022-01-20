import { FC } from 'react';

type TableBodyProps = {
	children: any;
};

const TableBody: FC<TableBodyProps> = ({ children }) => {
	return <tbody className='table__body'>{children}</tbody>;
};

export default TableBody;
