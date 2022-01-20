import { FC, useState } from 'react';
//@ts-ignore
import Skeleton from 'react-skeleton';

import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableHeader from '../Table/TableHeader';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableData from '../Table/TableData';
import PricePredictionRow from './PricePredictionRow';
import PricePredictionDataModel from '../../models/PredictionDataModel';
import './pricepredictiontable.styles.scss';

type PricePredictionTableProps = {
	predictions: PricePredictionDataModel[] | [];
};

const PricePredictionTable: FC<PricePredictionTableProps> = ({
	predictions,
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className='price__prediction__table'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead title={'coin predicted'} arrow/>
						<TableHead title={'my predictions'} arrow/>
						<TableHead title={'locked price'} />
						<TableHead title={'closing price '} />
						<TableHead title={'statistics'} />
						<TableHead title={'status'} arrow/>
						<TableHead title={''} />
					</TableRow>
				</TableHeader>
				<TableBody>
					{!loading ? (
						<>
							{predictions.map((prediction, idx) => (
								<PricePredictionRow prediction={prediction} key={idx} />
							))}

							{predictions.length === 0 && (
								<TableRow forTableBody>
									<TableData text={'No Result to show'} colSpan={6} />
								</TableRow>
							)}
						</>
					) : (
						[...Array(4)].map((_, idx) => (
							<TableRow key={idx} forTableBody>
								{[...Array(7)].map((_, idx) => (
									<TableData key={idx} text={''}>
										<Skeleton height={21} />
									</TableData>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default PricePredictionTable;
