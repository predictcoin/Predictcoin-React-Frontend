import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import WalletIcon from '../../../../assets/appSvgs/WalletIcon';
import stakingCardData from '../../data/stakingCardData';
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
	const { chainId } = useWalletViewModel();
	const { balance, decimals } = useToken(TOKENS[chainId].CRP)

	return (
		<section className='staking__main__content'>
			{modalOpened && <ModalDisconnect closeModal={() => setModalOpened(false)} CRPBalance={displayDecimals(ethers.utils.formatUnits(balance, decimals), 5)}/>}

			<div className='container'>
				<Header 
					title="Staking" 
					subtitle="Stake $PRED to earn PRED and other tokens." 
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
											{stakingCardData.map((card) => (
												<StakingCard
													key={card.id}
													id={card.id}
													tokenName={card.tokenName}
													tokenMultiple={card.tokenMultiple}
													aprEarned={card.aprEarned}
													predEarned={card.predEarned}
													predStaked={card.predStaked}
													totalStaked={card.totalStaked}
													walletUnlockStatus={card.walletUnlockStatus}
													buttonText={card.buttonText}
													contractUrl={card.contractUrl}
													USDTStaked={card.USDTStaked}
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
