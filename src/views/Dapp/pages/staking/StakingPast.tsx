import { FC, useEffect } from 'react';
import { useLoserPredictionPoolViewModel, useWinnerPredictionPoolViewModel } from '../../application/controllers/predictionPoolsViewModel';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';

import StakingTable from '../../Components/StakingTable';
import useNextRoundCountdown from '../../hooks/predictionPools/useCountdown';
import { displayTokenValue } from '../../lib/utils/number';

const StakingPast: FC = () => {
	const { getPastWinnerPools, 
		pastPools, currentPool, pools, totalEarnings: totalWinnerEarnings} = useWinnerPredictionPoolViewModel();
	const { getPastLoserPools, 
		totalEarnings: totalLoserEarnings
		} = useLoserPredictionPoolViewModel();
	const {active, address} = useWalletViewModel();

	useEffect(() => {
		if(!active) return;
		getPastWinnerPools();
		getPastLoserPools();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, address]);

	const {countdown} = useNextRoundCountdown();

	return (
		<div className='staking__past'>
			<div className='staking__details'>
				<div className='first'>
					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Staking rounds</p>
							<p className='value'>{pastPools.length}</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Active Round</p>
							<p className='value'>{pools[currentPool]?.round || 0}</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Next pool round</p>
							<p className='value'>{countdown}</p>
						</div>
					</div>
				</div>

				{active && <div className='earnings'>
					<div className='title__value'>
						<p className='title'>Unwithdrawn earnings</p>
						<p className='value'>
							{displayTokenValue(totalWinnerEarnings, 18, 5)} CRP 
							| {displayTokenValue(totalLoserEarnings, 18, 5)} MMF
						</p>
					</div>
				</div>}
			</div>

			<StakingTable />
		</div>
	);
};

export default StakingPast;
