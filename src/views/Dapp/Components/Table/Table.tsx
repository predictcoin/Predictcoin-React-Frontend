import { FC } from 'react';

type TableProps = {
	children: any;
};

const Table: FC<TableProps> = ({ children }) => {
	return <table id='table'>{children}</table>;
};

export default Table;
