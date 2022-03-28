import { FC } from 'react';
import StakingDataModel from '../../models/StakingDataModel';
import TableData from '../Table/TableData';
import TableRow from '../Table/TableRow';

interface StakingRowProps {
	stake: StakingDataModel;
}

const StakingRow: FC<StakingRowProps> = ({ stake }) => {

	return (
		<TableRow key={stake.stakingRound} forTableBody>
			<TableData text={stake.stakingRound} />
			<TableData text={stake.poolType} />
			<TableData text={stake.crpStaked} />
			<TableData text=''>
				<img src={stake.coinEarnedIcon} alt={stake.coinEarned} className="coin" />
				&nbsp;&nbsp;
				{stake.earned}
			</TableData>
			<TableData text={'.'} />
			<TableData text=''>
				<button
					onClick={stake.withdraw}
					className={`
						${stake.withdrawn === null ? 'no__withdraw' : ''}
						${stake.withdrawn === true ? 'withdrawn' : ''}
					`}
					disabled={stake.withdrawn === true || stake.withdrawn === null}
				>
					{stake.withdrawn === true && 'Earning withdrawn'}
					{stake.withdrawn === false && 'Withdraw earning'}
					{stake.withdrawn === null && '-'}
				</button>
			</TableData>
		</TableRow>
	);
};

export default StakingRow;
