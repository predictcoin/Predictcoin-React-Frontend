import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IoMdStopwatch } from 'react-icons/io';
import { RiArrowRightDownFill, RiArrowRightUpFill } from 'react-icons/ri';

import PredShadow from '../../../../assets/pics/PredShadow.png';
import EndedIllo from '../../../../assets/appSvgs/EndedIllo';
import UnsuccessfulIllo from '../../../../assets/appSvgs/UnsuccessfulIllo';
import DropdownOptions from './DropdownOptions';
import { coinPredictionOptions } from '../../data/options';
import './predictiondetails.styles.scss';

export enum RoundStatus {
	Ongoing = 'ongoing',
	Ended = 'ended',
	Unsuccessful = 'unsuccessful',
}

interface PredictionDetailsProps {
	status: RoundStatus;
}

// NOTE: The three options for the details are Ongoing, Ended and Unsuccessful.

const PredictionDetails: FC<PredictionDetailsProps> = ({ status }) => {
	return (
		<div className='prediction__details__content'>
			<p className='title'>start prediction</p>
			<p className='subtitle'>
				Enter prediction pools by entering up or down price predictions
			</p>

			<div
				className={`staking__round__timing ${
					status === 'ongoing' ? 'ongoing' : 'next__round'
				}`}
			>
				<p className='time__counter'>
					<span>
						<IoMdStopwatch />
						{status === 'ongoing'
							? 'LIVE ROUND ENDS IN:'
							: 'NEXT ROUND BEGINS IN:'}
					</span>
					<span className='time'>02h:34m:23s</span>
				</p>
				<div className='progress__bar'>
					<div className='elapsed'></div>
				</div>
			</div>

			<div
				className={`details__body ${
					status === 'ongoing' ? 'ongoing' : 'next__round'
				}`}
			>
				{status === 'ongoing' ? (
					<>
						<div className='predict'>
							<div className='select__coin'>
								<p>Select coin to predict</p>
								<DropdownOptions
									options={coinPredictionOptions}
									value={coinPredictionOptions[0]}
								/>
							</div>

							<div className='locked__position'>
								<p>locked position</p>
								<h4 className='value'>$56,000</h4>
							</div>
						</div>

						<div className='available__balance'>
							<div className='top'>
								<p>
									<span>available balance:</span> 240.005
								</p>
								<img src={PredShadow} alt='pred-logo' />
							</div>
							<p className='note'>
								You will be charged 10 PRED for each pool entered
							</p>
						</div>

						<div className='buttons'>
							<button className='down'>
								<RiArrowRightDownFill />
								enter down
							</button>
							<button className='up'>
								<RiArrowRightUpFill />
								enter up
							</button>
						</div>
					</>
				) : (
					<>
						{status === 'ended' ? <EndedIllo /> : <UnsuccessfulIllo />}
						<p className='round__status__title'>
							{status === 'ended'
								? 'This round has ended'
								: 'This round was unsuccessful'}
						</p>
						<p className='round__status__desc'>
							{status === 'ended'
								? 'The next round will begin when the counter resets, you can check past rounds to see your past earnings'
								: 'This is on us and we are indeed sorry, you can claim the tokens for this round and try again when the counter resets'}
						</p>
						<Link to='past-rounds'>See past rounds</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default PredictionDetails;
