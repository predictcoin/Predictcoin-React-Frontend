import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { usePredictionViewModel } from '../../application/controllers/predictionViewModel';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';
import Cold from '../../Components/Cold';

import PricePredictionTable from '../../Components/PricePredictionTable';

const PricePredictionPast: FC = () => {
	const {active, address} = useWalletViewModel();
	const {pastAvailable, isLoadingPast, getRounds, overview, withdraw} = usePredictionViewModel();

	useEffect(() => {
		const loadPast = async () => {
			if(!pastAvailable && !isLoadingPast){
				getRounds()
			}else if(active){
				getRounds();
			}
		}
		loadPast();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, address]);

	return (
		<div className='price__prediction__past'>
			{	
				active && 
				<>
					<div className='price__prediction__details'>
						<div className='first'>
							<div className='detail'>
								<span className='dot'></span>
								<div className='title__value'>
									<p className='title'>Pools entered</p>
									<p className='value'>{overview.poolsEntered}</p>
								</div>
							</div>

							<div className='detail'>
								<span className='dot'></span>
								<div className='title__value'>
									<p className='title'>Rounds Won</p>
									<p className='value'>{overview.roundsWon}</p>
								</div>
							</div>

							<div className='detail'>
								<span className='dot'></span>
								<div className='title__value'>
									<p className='title'>Rounds lost</p>
									<p className='value'>{overview.roundsLost}</p>
								</div>
							</div>

							<div className='detail'>
								<span className='dot'></span>
								<div className='title__value'>
									<p className='title'>Unsuccessful</p>
									<p className='value'>{overview.unsuccessful}</p>
								</div>
							</div>
						</div>

						<div className='earnings'>
							<div className='title__value'>
								<p className='title'>Tokens from unsuccessful rounds</p>
								<p className='value'>{overview.unsuccessfulTokens}</p>
							</div>

							<button 
								onClick={() => withdraw()}
								className={!(new BigNumber(overview.unsuccessfulTokens).gt(0)) ? "disabled" : ""}
							>Withdraw tokens</button>
						</div>
					</div>
					<PricePredictionTable />
				</>
			}	
			{!active && <Cold button text="Connect your wallet to view your past predictions."/>}
		</div>
	);
};

export default PricePredictionPast;
