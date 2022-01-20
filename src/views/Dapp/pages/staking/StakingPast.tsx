import { FC } from 'react';

import StakingTable from '../../Components/StakingTable';
import StakingTableData from '../../data/stakingTableData';

const StakingPast: FC = () => {
	return (
		<div className='staking__past'>
			<div className='staking__details'>
				<div className='first'>
					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Staking rounds</p>
							<p className='value'>23</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Last active round</p>
							<p className='value'>15hrs ago</p>
						</div>
					</div>

					<div className='detail'>
						<span className='dot'></span>
						<div className='title__value'>
							<p className='title'>Next pool round</p>
							<p className='value'>5hrs to go</p>
						</div>
					</div>
				</div>

				<div className='earnings'>
					<div className='title__value'>
						<p className='title'>Earnings from past pools</p>
						<p className='value'>0.1235 PRED</p>
					</div>
				</div>
			</div>

			<StakingTable stakes={StakingTableData} />
		</div>
	);
};

export default StakingPast;
