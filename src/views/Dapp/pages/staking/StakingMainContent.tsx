import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import WalletIcon from '../../../../assets/appSvgs/WalletIcon';
import stakingCardData from '../../data/stakingCardData';
import StakingCard from '../../Components/StakingCard';
import StakingPast from './StakingPast';
import ModalConnect from '../../Components/CustomModal/ModalConnect';
import ModalDisconnect from '../../Components/CustomModal/ModalDisconnect';

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

	return (
		<section className='staking__main__content'>
			{modalOpened && <ModalDisconnect closeModal={() => setModalOpened(false)}/>}

			<div className='container'>
				<header>
					<button
						className='hamburger'
						onClick={() =>
							setIsSidebarExpanded((isSidebarExpanded) => !isSidebarExpanded)
						}
					>
						<div id='nav-icon1' className={isSidebarExpanded ? 'open' : ''}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>

					<div className='header__text'>
						<h1>Staking</h1>
						<p>Stake $PRED to earn PRED and other tokens.</p>
					</div>

					<div className='header__ctas'>
						<div className='wallet__price'>
							<img src={PredictLogoSidebar} alt='predict-coin-logo' />
							<p>25.08 PRED</p>
						</div>
						{/* add 'not__connected class if wallet is not connected' */}
						<button className='address' onClick={() => setModalOpened(true)}>
							<WalletIcon />
							<span>0x5TD6...4567</span>
						</button>
					</div>
				</header>

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
