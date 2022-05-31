import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';


import FarmingCard from '../../Components/FarmingCard';
import ModalConnect from '../../Components/CustomModal/ModalConnect';
import ModalDisconnect from '../../Components/CustomModal/ModalDisconnect';
import { TOKENS } from '../../constants/addresses';
import { useWalletViewModel } from '../../application/controllers/walletViewModel';
import useToken from '../../hooks/useToken';
import { ethers } from 'ethers';
import { displayDecimals } from '../../lib/utils/number';
import Header from '../../Components/Header';
import { useStakingViewModel } from '../../application/controllers/stakingViewModel';
import { WalletStatus } from '../../models/StakingCardModel';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { skeletonBaseColor, skeletonHighlightColor } from '../../constants/colors';

interface FarmingMainContentProps {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const FarmingSkeleton = () => {
	return <div className="skeleton__container">
		<SkeletonTheme enableAnimation={true} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor}>
		<div className="staking__skeleton">
			<Skeleton width="100%" height="2rem"/>
			<br/>
			<Skeleton width="80%" height="1.5rem"/>
			<br></br>
			<Skeleton width="80%" height="1.5rem"/>
			<Skeleton width="80%" height="1.5rem"/>
			<Skeleton width="80%" height="1.5rem"/>
			<br />
			<Skeleton width="100%" height="3rem"/>
		</div>
	</SkeletonTheme></div>
}

const FarmingMainContent: FC<FarmingMainContentProps> = ({

	setIsSidebarExpanded,
}) => {
	const [walletModal, setWalletModal] = useState<boolean>(false);
	const { chainId, active} = useWalletViewModel();
	const { initFarming, farmingCardData, harvest, farmingAvailable } = useStakingViewModel();
	const { balance, decimals,  } = useToken(TOKENS[chainId].PRED)

	useEffect(() => {
		initFarming();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active])

	const modal = active ? (
		<ModalDisconnect closeModal={() => setWalletModal(false)} PREDBalance={ displayDecimals(ethers.utils.formatUnits(balance, decimals), 5) }/>
	) : (
		<ModalConnect closeModal={() => setWalletModal(false)} />
	);

	return (
		<section className='farming__main__content'>
			{walletModal && modal}

			<div className='container'>
				<Header 
					title="Farming" 
					subtitle="Farm $PRED with LP Tokens"
					isSidebarExpanded 
					setIsSidebarExpanded={setIsSidebarExpanded}
					setModalOpened={setWalletModal}
				/>
				<main>
					<div className='farming__card__container'>
						{farmingAvailable ? 
							farmingCardData.map((card) => (
								<FarmingCard
									key={card.id}
									id={card.id}
									tokenName={card.tokenName}
									tokenMultiple={card.tokenMultiple}
									apr={card.apr}
									earned={card.earned}
									tokenPrice = {card.tokenPrice}
									totalUSDStaked={card.totalUSDStaked}
									contractUrl={card.contractUrl}
									USDStaked={card.USDStaked}
									walletUnlockStatus={active ? WalletStatus.unlocked : WalletStatus.locked}
									USDEarned={card.USDEarned}
									staked={card.staked}
									earn={card.earn}
									stake={card.stake}
									harvest={harvest}
									decimals={decimals}
								/>
							)) :
							<>
								<FarmingSkeleton />
								<FarmingSkeleton />
								<FarmingSkeleton />
							</>
						}
					</div>
				</main>
			</div>
		</section>
	);
};

export default FarmingMainContent;
