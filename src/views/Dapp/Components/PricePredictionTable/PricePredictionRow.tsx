import { FC } from 'react';
import {
	RiArrowUpFill,
	RiArrowDownFill,
	RiArrowRightFill,
	RiArrowRightDownFill,
	RiArrowRightUpFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';

import { displayTokenValue } from '../../lib/utils/number';
import PredictionDataModel, { Position, Status } from '../../models/PredictionDataModel';
import TableData from '../Table/TableData';
import TableRow from '../Table/TableRow';

interface PricePredictionRowProps {
	prediction: PredictionDataModel;
}

const ProcePredictionRow: FC<PricePredictionRowProps> = ({ prediction }) => {

	const {active} = useWalletViewModel()

	return (
		<TableRow forTableBody>
			<TableData text={prediction.round}></TableData>
			<TableData text=''>
				<img
					className="coin-predicted"
					src={prediction.coinPredictedIcon}
					alt={prediction.coinPredicted}
				/>
				{prediction.coinPredicted}
			</TableData>
			{
				active && 
				<TableData text={''}>
					{prediction.myPrediction === Position.BULL && (
						<p className='up'>
							<RiArrowUpFill /> UP
						</p>
					)}
					{prediction.myPrediction === Position.BEAR && (
						<p className='down'>
							<RiArrowDownFill /> DOWN
						</p>
					)}
					{prediction.myPrediction === Position.STAY && (
						<p className='stay'>
							<RiArrowRightFill /> -
						</p>
					)}
				</TableData>
			}
			<TableData text={displayTokenValue(prediction.lockedPrice, 8, 2)} />
			<TableData text={displayTokenValue(prediction.closingPrice, 8, 2)} />
			<TableData text={''}>
				<span className='down__statistics'>
					<RiArrowRightDownFill />
					{prediction.statistics[1]}%
				</span>
				&nbsp;
				<span className='up__statistics'>
				<RiArrowRightUpFill />
					{prediction.statistics[0]}%
				</span>
			</TableData>
			<TableData text={prediction.status} />
			{ active &&
				<TableData text=''>
					<Link
						to="/app/staking"
					>
						<button
						className={`
							${prediction.status === Status.UNSUCCESSFUL || 
								prediction.status === Status.PENDING ? 'no__earn' : ''}
							${prediction.status === Status.UNSUCCESSFUL && 'earned'}
						`}
						disabled={prediction.status === Status.UNSUCCESSFUL}
					>
						{prediction.status === Status.UNSUCCESSFUL || prediction.status === Status.PENDING
							? ''
							: `Earn ${prediction.status === Status.WON 
									?  "CRP"
									:  "MMF"
							} `}
					</button>
					</Link>
				</TableData>
			}
		</TableRow>
	);
};

export default ProcePredictionRow;
