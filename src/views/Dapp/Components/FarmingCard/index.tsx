import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CRPLogo from '../../../../assets/pics/CRP.png';
import MMFLogo from '../../../../assets/pics/meerkat.png';
import ExportIcon from '../../../../assets/appSvgs/ExportIcon';
import './farmingcard.styles.scss';
import FarmingCardModel from '../../models/FarmingCardModel';
import { WalletStatus } from '../../models/StakingCardModel';
import useToken from '../../hooks/useToken';
import { getTokenAddress } from '../../lib/utils/token';
import {StakeModal} from "../../Components/CustomModal/StakeModal";
import  BigNumber from 'bignumber.js';
import { displayDecimals, displayTokenValue, toNumberLib } from '../../lib/utils/number';
import { constants, utils } from 'ethers';
import ConnectModal from "../../Components/CustomModal/ModalConnect";
import { useWalletViewModel } from '../../application/controllers/walletViewModel';
import { useStakingViewModel } from '../../application/controllers/stakingViewModel';
import { STAKING_ADDRESSES } from '../../constants/addresses';

const contractAddress = STAKING_ADDRESSES[
			process.env.REACT_APP_ENVIRONMENT as keyof typeof STAKING_ADDRESSES];

const FarmingCard: FC<FarmingCardModel> = ({
	id,
	tokenName,
	tokenMultiple,
	apr,
	earned,
	totalUSDStaked,
	contractUrl,
	USDStaked,
	USDEarned,
	staked,
	earn,
	walletUnlockStatus,
	harvest,
	decimals: lpTokenDecimals,
	tokenPrice
}) => {
	const tokenAddress = getTokenAddress(tokenName);
	const {address} = useWalletViewModel();
	const {allowances, getAllowance, balance, decimals, approve} = useToken(tokenAddress);
	const [farmModal, setFarmModal] = useState<{open: boolean, title: string}>({open: false, title:""});
	const [walletModal, setWalletModal] = useState<boolean>(false);
	const [amount, setAmount] = useState<string>();
	const active = walletUnlockStatus === WalletStatus.unlocked;
	const {stake, unStake} = useStakingViewModel();


	useEffect(() => {
		if(active) getAllowance(contractAddress)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	// handlers
	const stakeHandler = () => {
		stake(tokenName, +id, utils.parseUnits(amount || "0", decimals).toString(), amount || "0",)
		closeStakeModal(false);
	}

	const unstakeHandler = () => {
		unStake(tokenName, +id, utils.parseUnits(amount || "0", decimals).toString(), amount || "0",)
		closeStakeModal(false);
	}

	const _setAmount = ({target: {value}}: {target: {value: string}}) => {
		if(isNaN(+value)) {
			setAmount(amount);
		}else{
			setAmount(value);
		}
	}

	let harvestBtn = 	<button 
			className={`action harvest ${new BigNumber(earned).gt(0) && "active"}`}
			onClick={() => harvest(+id, tokenName)}
		>
			Harvest
		</button>
	let unlockBtn = <button 
		className={`action unlock`} 
		onClick={() => setWalletModal(true)}>
			Unlock
		</button>
	let approveBtn = <button 
		className={`action approve`}
		onClick={() => approve(contractAddress, constants.MaxUint256)}
		>Approve</button>


	const mainBtn = walletUnlockStatus === WalletStatus.locked ? unlockBtn :
		allowances[tokenAddress]?.gte(1) ? harvestBtn : approveBtn;

	const closeStakeModal = (open: boolean) => {
		setFarmModal({open, title: ""}); 
		_setAmount({target: {value:""}})
	}

	return (
		<>
		{farmModal.open && 
				<StakeModal 
					closeModal={closeStakeModal}  
					tokenName={tokenName as string}
					value={amount || ""}
					usdValue={new BigNumber(tokenPrice).times(amount || 0).toFixed()}
					balance={farmModal.title === "Stake" ? toNumberLib(balance).toFixed() : staked}
					type={farmModal.title}
					confirm={farmModal.title === "Stake" ? stakeHandler : unstakeHandler}
					onChange={_setAmount}
					decimals={decimals}
				/>
			}
			{walletModal && <ConnectModal closeModal={setWalletModal}/>}
		<div className='farming__card'>
			<div className='farming__card__top'>
				<div className='token__images'>
					<img src={CRPLogo} alt='busd-logo' />
					<img src={MMFLogo} alt='predict-coin-logo' />
				</div>

				<div className='token__title'>
					<p className='name'>{tokenName}</p>
					<p className='multiple'>{tokenMultiple}</p>
				</div>
			</div>
			<div className='farming__card__content'>
				<div className='price__stake'>
					<div className="heading"><span>STAKE {tokenName}</span><span>{active && `~ $${displayTokenValue(USDStaked, lpTokenDecimals, 2)}`}</span></div>
					{ 
						active && 
						<div className="staked">
								<span><span className="light">Staked</span> {displayTokenValue(staked, lpTokenDecimals, 5)}</span>
							<div className="buttons">
								<button className='add' onClick={() => setFarmModal({title: "Stake", open: true})}>
									<span> + </span>
								</button>
								&nbsp;
								<button className='minus' onClick={() => setFarmModal({title: "Unstake", open: true})}>
									<span> - </span>
								</button>
							</div>
						</div>
					}
					<div className="card-row">
						<div><span className="light">APR</span><span className="normal">{displayDecimals(apr, 2)}%</span></div>
						<span><span className="light">EARN</span><span className="normal">{earn}</span></span>
					</div>
					{
						active && 
						<div className="card-row">
							<div><span className="light">EARNED</span><span>{displayTokenValue(earned, 18, 5)} CRP</span></div>
								{console.log(lpTokenDecimals, 2)}
								<span>~ ${displayTokenValue(USDEarned, lpTokenDecimals, 2)}</span>
						</div>
					}
				</div>

				{mainBtn}

				<div className='stake__details'>
					<p>Total staked: ${displayTokenValue(totalUSDStaked, lpTokenDecimals, 2)}</p>
					<Link to={contractUrl}>
						<span>View Contract</span>
						<ExportIcon />
					</Link>
				</div>
			</div>
		</div>
		</>
	);
};

export default FarmingCard;
