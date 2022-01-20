import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowDown } from 'react-icons/hi';

import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
// import BUSD from '../../../../assets/pics/BUSD.png';
import ExportIcon from '../../../../assets/appSvgs/ExportIcon';
import { WalletStatus } from '../../models/StakingCardModel';
import './stakingcard.styles.scss';

interface StakingCardProps {
	id: string;
	tokenName: string;
	tokenMultiple: string;
	aprEarned: string;
	predEarned: string;
	predStaked: string;
	totalStaked: number;
	walletUnlockStatus: WalletStatus.locked | WalletStatus.unlocked;
	buttonText: string[];
	contractUrl: string;
	USDTStaked: number;
}

const StakingCard: FC<StakingCardProps> = ({
	id,
	tokenName,
	tokenMultiple,
	aprEarned,
	predEarned,
	predStaked,
	totalStaked,
	walletUnlockStatus,
	buttonText,
	contractUrl,
	USDTStaked,
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
		<div className='staking__card'>
			<div className='staking__card__top'>
				<div className='token__images'>
					<img src={PredictLogoSidebar} alt='predict-coin-logo' />
				</div>

				<div className='token__title'>
					<p className='name'>{tokenName}</p>
					<p className='multiple'>{tokenMultiple}</p>
				</div>
			</div>
			<div className='staking__card__content'>
				<div className='price__stake'>
					<div className='price'>
						<div className='section'>
							<div>
								<span className='light'>APR</span>
								<span className='normal'>{aprEarned}</span>
							</div>
							<div>
								<span className='light'>STAKE</span>
								<span className='normal'>{predStaked}</span>
							</div>
							<div>
								<span className='light'>EARN</span>
								<span className='normal'>{predEarned}</span>
							</div>
						</div>
					</div>

					{walletUnlockStatus === 'unlocked' ? (
						<div className='stake'>
							<button className='minus' onClick={decreaseStakedUsdt}>
								<span> - </span>
							</button>
							<div className='usdt__staked'>
								<p>PRED Staked</p>
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
					) : (
						<div className='unlock__text'>
							<p>unlock wallet to begin staking</p>
							<HiOutlineArrowDown />
						</div>
					)}

					<div
						className={`action__container ${
							buttonText.length > 1 ? 'two' : ''
						}`}
					>
						{buttonText.map((text, idx) => (
							<button
								className={`action ${text.includes('Unlock') ? 'unlock' : ''} ${
									text.includes('Harvest') ? 'harvest' : ''
								}`}
								key={idx}
							>
								{text}
							</button>
						))}
					</div>
				</div>

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

export default StakingCard;
