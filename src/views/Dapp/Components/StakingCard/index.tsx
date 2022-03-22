import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowDown } from 'react-icons/hi';

import CRPLogo from '../../../../assets/pics/CRP.png';
// import BUSD from '../../../../assets/pics/BUSD.png';
import ExportIcon from '../../../../assets/appSvgs/ExportIcon';
import { StakingCardModel } from '../../models/StakingCardModel';
import './stakingcard.styles.scss';
import { WalletStatus } from '../../application/controllers/stakingViewModel';
import useToken from '../../hooks/useToken';
import { getTokenAddress } from '../../lib/utils/token';
import { constants, utils } from 'ethers';

interface MoreProps {
	buttonClicks: (() => any)[]
}

const StakingCard: FC<StakingCardModel & MoreProps> = ({
	id,
	tokenName,
	tokenMultiple,
	apr,
	earn,
	stake,
	totalStaked,
	walletUnlockStatus,
	buttonText,
	contractUrl,
	staked,
	USDStaked,
	earned,
	USDEarned,
	buttonClicks,
	decimals
}) => {
	const [stakedUsdt, setStakedUsdt] = useState<string>(USDStaked);
	const {getAllowance, allowances, approve} = useToken(getTokenAddress(tokenName));
	const matches = /.*\/(\w+$)/.exec(contractUrl);
	const contractAddress = matches && matches[1];
	useEffect(() => {
		contractAddress && getAllowance(contractAddress)
	}, []);

	const increaseStakedUsdt = () => {
		// let newStakedUsdt = stakedUsdt + 1;
		// newStakedUsdt = newStakedUsdt <= 100 ? newStakedUsdt : stakedUsdt;
		// setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	const decreaseStakedUsdt = () => {
		// let newStakedUsdt = stakedUsdt - 1;
		// newStakedUsdt = newStakedUsdt >= 0 ? newStakedUsdt : stakedUsdt;
		// setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	const validate = (evt: ChangeEvent<HTMLInputElement>) => {
		// let newStakedUsdt = isNaN(+evt.target.value) ? 0 : +evt.target.value;
		// newStakedUsdt = newStakedUsdt <= 100 ? newStakedUsdt : stakedUsdt;
		// setStakedUsdt(+newStakedUsdt.toFixed(5));
	};

	const allowed = contractAddress && allowances[contractAddress]?.gte(1)
	buttonText = walletUnlockStatus === WalletStatus.locked ? ["Unlock Wallet"] : buttonText;

	if(contractAddress && !allowed){
		buttonText = ["Enable Pred"]
		buttonClicks = [() => approve(contractAddress, constants.MaxUint256)]
	}

	return (
		<div className='staking__card'>
			<div className='staking__card__top'>
				<div className='token__images'>
					<img src={CRPLogo} alt='predict-coin-logo' />
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
								<span className='normal'>{apr}%</span>
							</div>
							<div>
								<span className='light'>STAKE/EARN</span>
								<span className='normal'>{stake}/{earn}</span>
							</div>
							<div>
								<span className='light'>EARNINGS</span>
								<span className='normal'>{earned} <span className="dollar"> ~${USDEarned}</span></span>
							</div>
						</div>
					</div>

					{walletUnlockStatus === 'unlocked' ? (
						<div className='stake'>
							<button className={`minus ${walletUnlockStatus === WalletStatus.unlocked && "active"}`} onClick={decreaseStakedUsdt}>
								<span className={`${allowed && "active"}`}> - </span>
							</button>
							<div className='usdt__staked'>
								<p>CRP Staked</p>
								<div><span className="amount">{staked}</span><span className="dollar"> ~${USDStaked}</span></div>
							</div>
							<button className={`add ${walletUnlockStatus === WalletStatus.unlocked && "active"}`} onClick={increaseStakedUsdt}>
								<span className={`${allowed && "active"}`}> + </span>
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
								onClick={buttonClicks[idx]}
							>
								{walletUnlockStatus === WalletStatus.locked ? "Unlock Wallet" : text}
							</button>
						))}
					</div>
				</div>

				<div className='stake__details'>
					<p>Total staked: {totalStaked}</p>
					<a href={contractUrl} target="_true">
						<span>View Contract</span>
						<ExportIcon />
					</a>
				</div>
			</div>
		</div>
	);
};

export default StakingCard;
