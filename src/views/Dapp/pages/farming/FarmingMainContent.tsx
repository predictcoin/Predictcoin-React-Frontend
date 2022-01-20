import { Dispatch, FC, SetStateAction, useState } from 'react';

import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import WalletIcon from '../../../../assets/appSvgs/WalletIcon';
import farmingCardData from '../../data/farmingCardData';
import FarmingCard from '../../Components/FarmingCard';
import ModalConnect from '../../Components/CustomModal/ModalConnect';
import ModalDisconnect from '../../Components/CustomModal/ModalDisconnect';

interface FarmingMainContentProps {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const FarmingMainContent: FC<FarmingMainContentProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	const [modalOpened, setModalOpened] = useState<boolean>(false);

	return (
		<section className='farming__main__content'>
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
						<h1>Farming</h1>
						<p>Farm $PRED with USDT </p>
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
					<div className='farming__card__container'>
						{farmingCardData.map((card) => (
							<FarmingCard
								key={card.id}
								id={card.id}
								tokenName={card.tokenName}
								tokenMultiple={card.tokenMultiple}
								aprEarned={card.aprEarned}
								predEarned={card.predEarned}
								totalStaked={card.totalStaked}
								contractUrl={card.contractUrl}
								ctaType={card.ctaType}
								USDTStaked={card.USDTStaked}
							/>
						))}
					</div>
				</main>
			</div>
		</section>
	);
};

export default FarmingMainContent;
