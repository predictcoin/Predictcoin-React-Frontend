import { Dispatch, FC, SetStateAction } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import FarmingIcon from '../../../../assets/appSvgs/FarmingIcon';
import StakingIcon from '../../../../assets/appSvgs/StakingIcon';
import SwapIcon from '../../../../assets/appSvgs/SwapIcon';
import VotingIcon from '../../../../assets/appSvgs/VotingIcon';
import IPOIcon from '../../../../assets/appSvgs/IPOIcon';
import PredictionCoin from '../../../../assets/appSvgs/PredictionCoin';
import PredictBidIcon from '../../../../assets/appSvgs/PredictBidIcon';
import SportPredictionIcon from '../../../../assets/appSvgs/SportPredictionIcon';
import CACoins from '../../../../assets/appSvgs/CACoins';
import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import './sidebar.styles.scss';

interface SidebarProps {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const { pathname } = useLocation();

	return (
		<section id='sidebar' className={isSidebarExpanded ? 'expand' : ''}>
			<nav>
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
				<ul>
					<li>
						<NavLink
							to='/app/staking'
							className={({ isActive }) =>
								isActive || pathname === '/app' ? 'active' : ''
							}
						>
							<div className='icon'>
								<StakingIcon />
							</div>
							<span>Staking</span>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/app/farming'
							className={({ isActive }) => (isActive ? 'active' : '')}
						>
							<div className='icon'>
								<FarmingIcon />
							</div>
							<span>Farming</span>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='##'
							className={({ isActive }) => (isActive ? 'active not__available' : '')}
						>
							<div className='icon'>
								<SwapIcon />
							</div>
							<div className='coming__soon'>
								<span>Swap</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='##'
							className={({ isActive }) => (isActive ? 'active not__available' : '')}
						>
							<div className='icon'>
								<VotingIcon />
							</div>
							<div className='coming__soon'>
								<span>Voting</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/app/price-prediction'
							className={({ isActive }) => (isActive ? 'active' : '')}
						>
							<div className='icon'>
								<PredictionCoin />
							</div>
							<span>Price Prediction</span>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='##'
							className={({ isActive }) => (isActive ? 'active not__available' : '')}
						>
							<div className='icon'>
								<PredictBidIcon />
							</div>
							<div className='coming__soon'>
								<span>Predict $BID</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='##'
							className={({ isActive }) => (isActive ? 'active not__available' : '')}
						>
							<div className='icon'>
								<SportPredictionIcon />
							</div>
							<div className='coming__soon'>
								<span>Sport Prediction</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='##'
							className={({ isActive }) => (isActive ? 'active not__available' : '')}
						>
							<div className='icon'>
								<IPOIcon />
							</div>
							<div className='coming__soon'>
								<span>IPO</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li>
				</ul>

				<div className='CA__section'>
					<div className='blur'></div>
					<div className='coins__bg'>
						<CACoins />
					</div>
					<div className='CA__section__content'>
						<p className='address'>0xbdd2e3...323f226ba22</p>
						<button className='copy__CA'>click to copy CA</button>
						<img src={PredictLogoSidebar} alt='predict-logo-sidebar' />
					</div>
				</div>
			</nav>
		</section>
	);
};

export default Sidebar;
