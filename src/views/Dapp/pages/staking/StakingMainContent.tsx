import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import StakingCard from "../../Components/StakingCard";
import StakingPast from "./StakingPast";
import ModalConnect from "../../Components/CustomModal/ModalConnect";
import ModalDisconnect from "../../Components/CustomModal/ModalDisconnect";
import { displayDecimals } from "../../lib/utils/number";
import { ethers } from "ethers";
import useToken from "../../hooks/useToken";
import { TOKENS } from "../../constants/addresses";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import Header from "../../Components/Header";
import { useStakingViewModel } from "../../application/controllers/stakingViewModel";
import PredictionPoolCard from "../../Components/PredictionPoolCard";
import {
    useLoserPredictionPoolViewModel,
    useWinnerPredictionPoolViewModel
} from "../../application/controllers/predictionPoolsViewModel";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StakingSkeleton = () => {
    return (
        <div className="skeleton__container">
            <SkeletonTheme
                enableAnimation={true}
                baseColor={skeletonBaseColor}
                highlightColor={skeletonHighlightColor}
            >
                <div className="staking__skeleton">
                    <Skeleton width="100%" height="2rem" />
                    <br />
                    <Skeleton width="80%" height="1.5rem" />
                    <Skeleton width="80%" height="1.5rem" />
                    <Skeleton width="80%" height="1.5rem" />
                    <br />
                    <Skeleton width="70%" height="3rem" />
                    <br /> <br />
                    <Skeleton height="2.5rem" width="50%" />
                </div>
            </SkeletonTheme>
        </div>
    );
};
interface StakingMainContentProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const StakingMainContent: FC<StakingMainContentProps> = ({
    isSidebarExpanded,
    setIsSidebarExpanded
}) => {
    const { pathname } = useLocation();
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const { chainId, active, address } = useWalletViewModel();
    const { balance, decimals } = useToken(TOKENS[chainId].CRP);
    const { stakingCardData, stakingAvailable, initStaking, isLoadingStaking } =
        useStakingViewModel();
    const {
        available: loserAvailable,
        isLoading: isLoadingLoser,
        initLoserPool
    } = useLoserPredictionPoolViewModel();
    const {
        available: winnerAvailable,
        isLoading: isLoadingWinner,
        initWinnerPool
    } = useWinnerPredictionPoolViewModel();

    const modal = active ? (
        <ModalDisconnect
            closeModal={() => setModalOpened(false)}
            CRPBalance={displayDecimals(
                ethers.utils.formatUnits(balance, decimals),
                5
            )}
        />
    ) : (
        <ModalConnect closeModal={() => setModalOpened(false)} />
    );

    useEffect(() => {
        console.log(active);
        if ((!stakingAvailable && !isLoadingStaking) || active) {
            initStaking();
        }
        if ((!loserAvailable && !isLoadingLoser) || active) {
            initLoserPool();
        }
        if ((!winnerAvailable && !isLoadingWinner) || active) {
            initWinnerPool();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, address]);

    return (
        <section className="staking__main__content">
            {modalOpened && modal}

            <div className="container">
                <Header
                    title="Staking"
                    subtitle="Stake $CRP to earn $CRP and other tokens."
                    isSidebarExpanded
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    setModalOpened={setModalOpened}
                />
                <main>
                    <div className="tab">
                        <Link
                            to="live"
                            className={`${
                                pathname === "/staking" ||
                                pathname === "/staking/live"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            LIVE POOL
                        </Link>
                        <Link
                            to="past"
                            className={`${
                                pathname === "/staking/past" ? "active" : ""
                            }`}
                        >
                            PAST POOLS
                        </Link>
                    </div>

                    <Routes>
                        {["/", "/live"].map((path, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <div className="staking__card__container">
                                            {stakingAvailable ? (
                                                stakingCardData.map((card) => (
                                                    <StakingCard
                                                        key={card.id}
                                                        id={card.id}
                                                    />
                                                ))
                                            ) : (
                                                <StakingSkeleton />
                                            )}
                                            {!winnerAvailable ? (
                                                <StakingSkeleton />
                                            ) : (
                                                <PredictionPoolCard type="winner" />
                                            )}
                                            {!loserAvailable ? (
                                                <StakingSkeleton />
                                            ) : (
                                                <PredictionPoolCard type="loser" />
                                            )}
                                        </div>
                                    }
                                />
                            );
                        })}
                        <Route path="/past" element={<StakingPast />} />
                    </Routes>
                </main>
            </div>
        </section>
    );
};

export default StakingMainContent;
