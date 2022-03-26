import { FC, useEffect } from 'react';
import { useLoserPredictionPoolViewModel, useWinnerPredictionPoolViewModel } from '../../application/controllers/predictionPoolsViewModel';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';

import StakingTable from '../../Components/StakingTable';
import StakingTableData from '../../data/stakingTableData';
import useNextRoundCountdown from '../../hooks/predictionPools/useCountdown';

const StakingPast: FC = () => {
	const {pastAvailable: winnerAvailable, isLoadingPastPools: loadingWinner, getPastWinnerPools, 
		pastPools, currentPool, pools} = useWinnerPredictionPoolViewModel();
	const {pastAvailable: loserAvailable, isLoadingPastPools: loadingLoser, getPastLoserPools
		} = useLoserPredictionPoolViewModel();
	const {active} = useWalletViewModel();

	useEffect(() => {
		if(!winnerAvailable && !loadingWinner){
			getPastWinnerPools();
		}
		if(!loserAvailable && !loadingLoser){
			getPastLoserPools();
		}
	}, []);

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
							<p className='title'>Active Prediction Round</p>
							<p className='value'>{pools[currentPool]?.round}</p>
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
						<p className='title'>Earnings from past pools</p>
						<p className='value'>0.1235 PRED</p>
					</div>
				</div>}
			</div>

			<StakingTable stakes={StakingTableData} />
		</div>
	);
};

export default StakingPast;
