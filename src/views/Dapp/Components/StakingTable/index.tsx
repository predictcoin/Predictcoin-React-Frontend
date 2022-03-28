import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableHeader from '../Table/TableHeader';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableData from '../Table/TableData';
import StakingRow from './StakingRow';
import StakingDataModel from '../../models/StakingDataModel';
import './stakingtable.styles.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { skeletonBaseColor, skeletonHighlightColor } from '../../constants/colors';
import { useLoserPredictionPoolViewModel, useWinnerPredictionPoolViewModel } from '../../application/controllers/predictionPoolsViewModel';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';
import Cold from '../Cold';


const StakingTable: FC = () => {
	
	const {active} = useWalletViewModel();
	const {pastLoserPoolData} = useLoserPredictionPoolViewModel();
	const {pastWinnerPoolData, pastAvailable: winnerPastAvailable} = useWinnerPredictionPoolViewModel();

	// merge winner and loser pools
	const stakes: StakingDataModel[] = [];
	pastWinnerPoolData.forEach(poolData1 => {
		const key = poolData1.stakingRound;
		const [poolData2] = pastLoserPoolData.filter((poolData) => poolData.stakingRound === key);
		stakes.push(...(poolData2 ? [poolData1, poolData2] : [poolData1]));
	})

	return (
		<>{ active ?
			<div className='staking__table'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead title={'Staking round'} arrow/>
							<TableHead title={'Pool type'} arrow/>
							<TableHead title={'CRP staked'} arrow/>
							<TableHead title={'Earned'} />
							<TableHead title={''} />
							<TableHead title={''} />
						</TableRow>
					</TableHeader>
					<TableBody>
						{pastWinnerPoolData.length !== 0 || winnerPastAvailable ? (
							<>
								{stakes.map((stake) => (
									<StakingRow stake={stake} key={uuidv4()} />
								))}

								{stakes.length === 0 && (
									<TableRow forTableBody>
										<TableData text={'No old pools yet'} colSpan={6} />
									</TableRow>
								)}
							</>
						) : (
							[...Array(4)].map((_, idx) => (
								<TableRow key={idx} forTableBody>
									{[...Array(6)].map((_, idx) => (
										<SkeletonTheme enableAnimation={true} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor}>
												<TableData key={idx} text={''}>
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
			:
			<Cold button text="Connect your wallet to view your balances and earnings from past pools."/>
			}
		</>
	);
};

export default StakingTable;
