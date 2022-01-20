import { FC, useState } from 'react';
//@ts-ignore
import Skeleton from 'react-skeleton';

import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableHeader from '../Table/TableHeader';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableData from '../Table/TableData';
import StakingRow from './StakingRow';
import StakingDataModel from '../../models/StalkingDataModel';
import './stakingtable.styles.scss';

type StakingTableProps = {
	stakes: StakingDataModel[] | [];
};

const StakingTable: FC<StakingTableProps> = ({ stakes }) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className='staking__table'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead title={'staking round'} arrow/>
						<TableHead title={'coin staked'} arrow/>
						<TableHead title={'PRED balance'} />
						<TableHead title={'earned'} />
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
									<TableData key={idx} text={''}>
										<Skeleton height={21} />
									</TableData>
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
