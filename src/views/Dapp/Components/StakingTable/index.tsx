import { FC, useState } from 'react';
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

type StakingTableProps = {
	stakes: StakingDataModel[] | [];
};

const StakingTable: FC<StakingTableProps> = ({ stakes }) => {
	const [loading,] = useState<boolean>(false);

	return (
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
					{!loading ? (
						<>
							{stakes.map((stake) => (
								<StakingRow stake={stake} key={stake.stakingRound} />
							))}

							{stakes.length === 0 && (
								<TableRow forTableBody>
									<TableData text={'No Result to show'} colSpan={6} />
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
	);
};

export default StakingTable;
