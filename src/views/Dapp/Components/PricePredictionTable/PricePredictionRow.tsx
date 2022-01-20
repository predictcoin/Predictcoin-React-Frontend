import { FC, useState } from 'react';
import {
	RiArrowUpFill,
	RiArrowDownFill,
	RiArrowRightFill,
	RiArrowRightDownFill,
	RiArrowRightUpFill,
} from 'react-icons/ri';

import numFormatter from '../../helpers/numFormatter';
import PredictionDataModel from '../../models/PredictionDataModel';
import TableData from '../Table/TableData';
import TableRow from '../Table/TableRow';

interface PricePredictionRowProps {
	prediction: PredictionDataModel;
}

const ProcePredictionRow: FC<PricePredictionRowProps> = ({ prediction }) => {
	const [earned, setEarned] = useState<boolean | null>(
		prediction.status === 'Unsuccessful'
	);

	return (
		<TableRow forTableBody>
			<TableData text=''>
				<img
					src={prediction.coinPredictedIcon}
					alt={prediction.coinPredicted}
				/>
				{prediction.coinPredicted}
			</TableData>
			<TableData text={''}>
				{prediction.myPrediction === 'UP' && (
					<p className='up'>
						<RiArrowUpFill /> UP
					</p>
				)}
				{prediction.myPrediction === 'DOWN' && (
					<p className='down'>
						<RiArrowDownFill /> DOWN
					</p>
				)}
				{prediction.myPrediction === 'STAY' && (
					<p className='stay'>
						<RiArrowRightFill /> -
					</p>
				)}
			</TableData>
			<TableData text={numFormatter(prediction.lockedPrice)} />
			<TableData text={numFormatter(prediction.closingPrice)} />
			<TableData text={''}>
				<span className='down__statistics'>
					<RiArrowRightDownFill />
					{prediction.statistics[0]}%
				</span>
				&nbsp;
				<span className='up__statistics'>
				<RiArrowRightUpFill />
					{prediction.statistics[1]}%
				</span>
			</TableData>
			<TableData text={prediction.status} />
			<TableData text=''>
				<button
					onClick={() => (earned === false ? setEarned(true) : null)}
					className={`
						${prediction.status === 'Unsuccessful' ? 'no__earn' : ''}
						${earned === true ? 'earned' : ''}
					`}
					disabled={earned === true || prediction.status === 'Unsuccessful'}
				>
					{prediction.status === 'Unsuccessful'
						? '-'
						: `Earn ${prediction.coinPredicted}`}
				</button>
			</TableData>
		</TableRow>
	);
};

export default ProcePredictionRow;
