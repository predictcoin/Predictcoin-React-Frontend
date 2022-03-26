import { FC, useState } from 'react';

import StakingDataModel from '../../models/StakingDataModel';
import TableData from '../Table/TableData';
import TableRow from '../Table/TableRow';

interface StakingRowProps {
	stake: StakingDataModel;
}

const StakingRow: FC<StakingRowProps> = ({ stake }) => {
	const [withdrawn, setWithdrawn] = useState<boolean | null>(stake.withdrawn);

	return (
		<TableRow key={stake.stakingRound} forTableBody>
			<TableData text={stake.stakingRound} />
			<TableData text={stake.poolType} />
			<TableData text={stake.crpStaked} />
			<TableData text=''>
				<img src={stake.coinEarnedIcon} alt={stake.coinEarned} />
				{stake.earned}
			</TableData>
			<TableData text={'.'} />
			<TableData text=''>
				<button
					onClick={() => withdrawn === false ? setWithdrawn(true) : null}
					className={`
						${withdrawn === null ? 'no__withdraw' : ''}
						${withdrawn === true ? 'withdrawn' : ''}
					`}
					disabled={withdrawn === true || withdrawn === null}
				>
					{withdrawn === true && 'Earning withdrawn'}
					{withdrawn === false && 'Withdraw earning'}
					{withdrawn === null && '-'}
				</button>
			</TableData>
		</TableRow>
	);
};

export default StakingRow;
