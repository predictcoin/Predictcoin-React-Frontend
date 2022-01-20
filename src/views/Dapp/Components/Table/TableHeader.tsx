import { FC } from 'react';
import { TableRowProps } from './TableRow';

type TableHeaderProps = {
	children: FC<TableRowProps> | any;
};

const TableHeader: FC<TableHeaderProps> = ({ children }) => {
	return <thead className='table__header'>{children}</thead>;
};

export default TableHeader;
