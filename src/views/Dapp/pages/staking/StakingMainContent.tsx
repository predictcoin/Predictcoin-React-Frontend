import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import StakingCard from '../../Components/StakingCard';
import StakingPast from './StakingPast';
import ModalConnect from '../../Components/CustomModal/ModalConnect';
import ModalDisconnect from '../../Components/CustomModal/ModalDisconnect';
import { displayDecimals } from '../../lib/utils/number';
import { ethers } from 'ethers';
import useToken from '../../hooks/useToken';
import { TOKENS } from '../../constants/addresses';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';
import Header from '../../Components/Header';
import { useStakingViewModel } from '../../application/controllers/stakingViewModel';

interface StakingMainContentProps {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const StakingMainContent: FC<StakingMainContentProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const { pathname } = useLocation();
	const [modalOpened, setModalOpened] = useState<boolean>(false);
	const { chainId, active } = useWalletViewModel();
	const { balance, decimals } = useToken(TOKENS[chainId].CRP);
	const {stakingCardData, stakingAvailable, initStaking, isLoadingStaking} = useStakingViewModel();
	const modal = active ? (
		<ModalDisconnect closeModal={() => setModalOpened(false)} CRPBalance={ displayDecimals(ethers.utils.formatUnits(balance, decimals), 5) }/>
	) : (
		<ModalConnect closeModal={() => setModalOpened(false)} />
	);

	useEffect(() => {
		if(!stakingAvailable && !isLoadingStaking){
			initStaking();
		}
	}, []);

	return (
		<section className='staking__main__content'>
			{modalOpened && modal}

			<div className='container'>
				<Header 
					title="Staking" 
					subtitle="Stake $CRP to earn CRP and other tokens." 
					isSidebarExpanded 
					setIsSidebarExpanded={setIsSidebarExpanded}
					setModalOpened={setModalOpened}
				/>
				<main>
					<div className='tab'>
						<Link
							to='live'
							className={`${
								pathname === '/app/staking' || pathname === '/app/staking/live'
									? 'active'
									: ''
							}`}
						>
							LIVE POOL
						</Link>
						<Link
							to='past'
							className={`${pathname === '/app/staking/past' ? 'active' : ''}`}
						>
							PAST POOL
						</Link>
					</div>

					<Routes>
						{['/', '/live'].map((path, index) => {
							return (
								<Route
									key={index}
									path={path}
									element={
										<div className='staking__card__container'>
											{stakingAvailable && stakingCardData.map((card) => (
												<StakingCard
													key={card.id}
													id={card.id}
													tokenName={card.tokenName}
													tokenMultiple={card.tokenMultiple}
													apr={card.apr}
													earn={card.earn}
													stake={card.stake}
													totalStaked={card.totalStaked}
													walletUnlockStatus={card.walletUnlockStatus}
													buttonText={card.buttonText}
													contractUrl={card.contractUrl}
													USDStaked={card.USDStaked}
													staked={card.staked}
													earned={card.staked}
													USDEarned={card.USDEarned}
													buttonClicks={card.buttonClicks}
													decimals={decimals}
												/>
											))}
										</div>
									}
								/>
							);
						})}
						<Route path='/past' element={<StakingPast />} />
					</Routes>
				</main>
			</div>
		</section>
	);
};

export default StakingMainContent;
