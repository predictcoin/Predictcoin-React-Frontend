// import { FC, useEffect, useState } from 'react';
// import { HiOutlineArrowDown } from 'react-icons/hi';

// import CRPLogo from '../../../../assets/pics/CRP.png';
// // import BUSD from '../../../../assets/pics/BUSD.png';
// import ExportIcon from '../../../../assets/appSvgs/ExportIcon';
// import './stakingcard.styles.scss';
// import { useStakingViewModel } from '../../application/controllers/stakingViewModel';
// import useToken from '../../hooks/useToken';
// import { getTokenAddress } from '../../lib/utils/token';
// import { constants, utils } from 'ethers';
// import { displayDecimals, displayTokenValue, toNumberLib } from '../../lib/utils/number';
// import { useWalletViewModel } from '../../application/controllers/walletViewModel';
// import ConnectModal from "../../Components/CustomModal/ModalConnect";
// import { STAKING_ADDRESSES } from '../../constants/addresses';
// import { StakeModal } from '../CustomModal/StakeModal';
// import BigNumber from "bignumber.js";

// interface Props {
// 	id: number
// };

// const contractAddress = STAKING_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof STAKING_ADDRESSES];

// const StakingCard: FC<Props> = ({
// 	id,
// }) => {
// 	const {active, address} = useWalletViewModel();
// 	const {stake, unStake, compound, harvest, stakingCardData} = useStakingViewModel();
// 	const {
// 		tokenName,
// 		tokenMultiple,
// 		apr,
// 		earn,
// 		stake: stakedToken,
// 		totalStaked,
// 		walletUnlockStatus,
// 		contractUrl,
// 		staked,
// 		USDStaked,
// 		earned,
// 		USDEarned,
// 		tokenPrice
// 	} = stakingCardData[id];

// 	const [walletModal, setWalletModal] = useState<boolean>(false);
// 	const {getAllowance, allowances, approve, decimals, balance} = useToken(getTokenAddress(tokenName));
// 	const [amount, setAmount] = useState<string>();
// 	const [stakeModal, setStakeModal] = useState<{open: boolean, title: string}>({open: false, title:""});

// 	useEffect(() => {
// 		active && getAllowance(contractAddress)
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [address]);

// 	const closeStakeModal = (open: boolean) => {
// 		setStakeModal({open, title: ""}); 
// 		_setAmount({target: {value:""}})
// 	}

// 	const stakeHandler = () => {
// 		stake(tokenName, +id, utils.parseUnits(amount || "0", decimals).toString(), amount || "0",)
// 		closeStakeModal(false);
// 	}

// 	const unstakeHandler = () => {
// 		unStake(tokenName, +id, utils.parseUnits(amount || "0", decimals).toString(), amount || "0",)
// 		closeStakeModal(false);
// 	}

// 	const _setAmount = ({target: {value}}: {target: {value: string}}) => {
// 		if(isNaN(+value)) {
// 			setAmount(amount);
// 		}else{
// 			setAmount(value);
// 		}
// 	}

// 	const allowed = contractAddress && allowances[contractAddress]?.gte(1)
// 	 // buttons
// 	const unlockButton = <button className={`action unlock`} onClick={() => setWalletModal(true)}>Unlock Wallet</button>
// 	const harvetButton = <button className={`action harvest ${+earned === 0 && "inactive"}`} onClick={() => harvest(id, tokenName)}>Harvest</button>
// 	const compoundButton = <button className={`action ${+earned === 0 && "inactive"}`} onClick={() => compound(tokenName)}>Compound</button>
// 	const approveButton = <button className={`action`} 
// 		onClick={() => approve( contractAddress, constants.MaxUint256)}
// 		>Approve</button>
	
// 	let mainButton = !active ? unlockButton : (allowed ? <>{harvetButton}{compoundButton}</> : approveButton)

// 	return (
// 		<>
// 			{
// 				stakeModal.open && 
// 					<StakeModal 
// 						closeModal={closeStakeModal}  
// 						tokenName={tokenName as string}
// 						value={amount || ""}
// 						usdValue={new BigNumber(tokenPrice).times(amount || 0).toFixed()}
// 						balance={stakeModal.title === "Stake" ? toNumberLib(balance).toFixed() : staked}
// 						type={stakeModal.title}
// 						confirm={stakeModal.title === "Stake" ? stakeHandler : unstakeHandler}
// 						onChange={_setAmount}
// 						decimals={decimals}
// 					/>
// 			}
// 			{walletModal && <ConnectModal closeModal={setWalletModal}/>}

// 			<div className='staking__card'>
// 				<div className='staking__card__top'>
// 					<div className='token__images'>
// 						<img src={CRPLogo} alt='predict-coin-logo' />
// 					</div>

// 					<div className='token__title'>
// 						<p className='name'>{tokenName}</p>
// 						<p className='multiple'>{tokenMultiple}</p>
// 					</div>
// 				</div>

// 				<div className='staking__card__content'>
// 					<div className='price__stake'>
// 						<div className='price'>
// 							<div className='section'>
// 								<div>
// 									<span className='light'>APR</span>
// 									<span className='normal'>{apr === "Infinity" ? "100000" : displayDecimals(apr, 2)}%</span>
// 								</div>
// 								<div>
// 									<span className='light'>STAKE/EARN</span>
// 									<span className='normal'>{stakedToken}/{earn}</span>
// 								</div>
// 								<div>
// 									<span className='light'>EARNINGS</span>
// 									<span className='normal'>{displayTokenValue(earned, 18, 5)} <span className="dollar"> ~${displayTokenValue(USDEarned, decimals, 2)}</span></span>
// 								</div>
// 							</div>
// 						</div>

// 						{walletUnlockStatus === 'unlocked' ? (
// 							<div className='stake'>
// 								<button className={`minus ${active && allowed && "active"}`} onClick={() => setStakeModal({title: "Unstake", open: true})}>
// 									<span className={`${active && "active"}`}> - </span>
// 								</button>

// 								<div className='usdt__staked'>
// 									<p>CRP Staked</p>
// 									<div><span className="amount">{displayTokenValue(staked, decimals, 5)}</span><span className="dollar"> ~${displayTokenValue(USDStaked, decimals, 2)}</span></div>
// 								</div>

// 								<button className={`add ${active && allowed && "active"}`} onClick={() => setStakeModal({title: "Stake", open: true})}>
// 									<span className={`${active && "active"}`}> + </span>
// 								</button>
// 							</div>
// 						) : (
// 							<div className='unlock__text'>
// 								<p>unlock wallet to begin staking</p>
// 								<HiOutlineArrowDown />
// 							</div>
// 						)}

// 						<div
// 							className={`action__container ${
// 								active && allowed ? 'two' : ''
// 							}`}
// 						>
// 							{mainButton}
// 						</div>
// 					</div>

// 					<div className='stake__details'>
// 						<p>Total staked: {displayTokenValue(totalStaked, decimals, 5)}</p>
// 						<a href={contractUrl} target="_true">
// 							<span>View Contract</span>
// 							<ExportIcon />
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default StakingCard;

export const StakingCard = null;
