import { FC } from 'react';

import PricePredictionTable from '../../Components/PricePredictionTable';
import PricePredictionTableData from '../../data/predictionTableData';

const PricePredictionPast: FC = () => {
	return (
		<div className='price__prediction__past'>
			<div className='price__prediction__details'>
				<div className='first'>
					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Pools entered</p>
							<p className='value'>23</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Rounds Won</p>
							<p className='value'>15</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Rounds lost</p>
							<p className='value'>5</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Unsuccessful</p>
							<p className='value'>3</p>
						</div>
					</div>
				</div>

				<div className='earnings'>
					<div className='title__value'>
						<p className='title'>Tokens from unsuccessful rounds</p>
						<p className='value'>0.1235 PRED</p>
					</div>

					<button>Withdraw tokens</button>
				</div>
			</div>

			<PricePredictionTable predictions={PricePredictionTableData} />
		</div>
	);
};

export default PricePredictionPast;
