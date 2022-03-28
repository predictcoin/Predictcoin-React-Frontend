import { FC } from 'react';
//@ts-ignore
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableHeader from '../Table/TableHeader';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableData from '../Table/TableData';
import PricePredictionRow from './PricePredictionRow';
import './pricepredictiontable.styles.scss';
import { usePredictionViewModel } from '../../application/controllers/predictionViewModel';
import Skeleton, { SkeletonTheme, } from 'react-loading-skeleton';
import { skeletonBaseColor, skeletonHighlightColor } from '../../constants/colors';
import { v4 as uuidv4 } from 'uuid';

const PricePredictionTable: FC = () => {
	const {pastAvailable, userPredictionData } = usePredictionViewModel();
	// const _pastRounds = pastRounds ? formatPredictionRounds(pastRounds) : [];
	const predictions = userPredictionData;

	return (
		<>
			<div className='price__prediction__table'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead title={'Round'} arrow/>
							<TableHead title={'Coin predicted'} arrow/>
							<TableHead title={'My predictions'} arrow/>
							<TableHead title={'Locked price'} />
							<TableHead title={'Closing price '} />
							<TableHead title={'Statistics'} />
							<TableHead title={'Status'} arrow/>
							<TableHead title={''} />
						</TableRow>
					</TableHeader>
					<TableBody>
						{predictions.length !== 0 || pastAvailable  ? (
							<>
								{predictions?.map((prediction) => (
									<PricePredictionRow prediction={prediction} key={uuidv4()} />
								))}

								{predictions?.length === 0 && (
									<TableRow forTableBody>
										<TableData text={'You have not made any Predictions yet'} colSpan={6} />
									</TableRow>
								)}
							</>
						) : (
							[...Array(4)].map((_, idx) => (
								<TableRow key={uuidv4()} forTableBody>
									{[...Array(7)].map((_) => (
										<SkeletonTheme key={uuidv4()} enableAnimation={true} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor}>
												<TableData  text={''}>
													<Skeleton height={21} />
												</TableData>
										</SkeletonTheme>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default PricePredictionTable;
