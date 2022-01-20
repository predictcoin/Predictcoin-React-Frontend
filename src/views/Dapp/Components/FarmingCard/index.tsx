import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';

import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import BUSD from '../../../../assets/pics/BUSD.png';
import ExportIcon from '../../../../assets/appSvgs/ExportIcon';
import './farmingcard.styles.scss';

interface FarmingCardProps {
	id: string;
	tokenName: string;
	tokenMultiple: string;
	aprEarned: string;
	predEarned: number;
	totalStaked: number;
	contractUrl: string;
	USDTStaked: number;
	ctaType: 'unlock' | 'harvest' | 'approve';
}

const FarmingCard: FC<FarmingCardProps> = ({
	id,
	tokenName,
	tokenMultiple,
	aprEarned,
	predEarned,
	totalStaked,
	contractUrl,
	USDTStaked,
	ctaType,
}) => {
	const [stakedUsdt, setStakedUsdt] = useState<number>(USDTStaked);

	const increaseStakedUsdt = () => {
		let newStakedUsdt = stakedUsdt + 1;
		newStakedUsdt = newStakedUsdt <= 100 ? newStakedUsdt : stakedUsdt;
		setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	const decreaseStakedUsdt = () => {
		let newStakedUsdt = stakedUsdt - 1;
		newStakedUsdt = newStakedUsdt >= 0 ? newStakedUsdt : stakedUsdt;
		setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	const validate = (evt: ChangeEvent<HTMLInputElement>) => {
		let newStakedUsdt = isNaN(+evt.target.value) ? 0 : +evt.target.value;
		newStakedUsdt = newStakedUsdt <= 100 ? newStakedUsdt : stakedUsdt;
		setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	return (
		<div className='farming__card'>
			<div className='farming__card__top'>
				<div className='token__images'>
					<img src={BUSD} alt='busd-logo' />
					<img src={PredictLogoSidebar} alt='predict-coin-logo' />
				</div>

				<div className='token__title'>
					<p className='name'>{tokenName}</p>
					<p className='multiple'>{tokenMultiple}</p>
				</div>
			</div>
			<div className='farming__card__content'>
				<div className='price__stake'>
					<div className='price'>
						<div className='section'>
							<div>
								<span className='light'>APR</span>
								<span className='normal'>{aprEarned}</span>
							</div>
							<div>
								<span className='light'>EARNED</span>
								<span className='normal'>{predEarned}</span>
							</div>
						</div>
						<div className='section'>
							<div>
								<span className='light'>EARN</span>
								<span className='normal'>PRED</span>
							</div>
							<div>
								<span className='normal'>~ ${predEarned}</span>
							</div>
						</div>
					</div>

					<div className='border'></div>

					<div className='stake'>
						<button className='minus' onClick={decreaseStakedUsdt}>
							<span> - </span>
						</button>
						<div className='usdt__staked'>
							<p>USDT Staked</p>
							<input
								type='number'
								name='usdt-staked'
								id='usdt-staked'
								value={stakedUsdt}
								min={0}
								max={100}
								onChange={(e) => validate(e)}
							/>
						</div>
						<button className='add' onClick={increaseStakedUsdt}>
							<span> + </span>
						</button>
					</div>
				</div>

				<button className={`action ${ctaType}`}>
					{ctaType === 'unlock' && 'Unlock Wallet'}
					{ctaType === 'harvest' && 'Harvest'}
					{ctaType === 'approve' && 'Approve Contract'}
				</button>

				<div className='stake__details'>
					<p>Total staked: ${totalStaked}</p>
					<Link to={contractUrl}>
						<span>View Contract</span>
						<ExportIcon />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FarmingCard;
