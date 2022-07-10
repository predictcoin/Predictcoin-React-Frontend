import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";

import StakingCard from "../../Components/StakingCard";
import ModalConnect from "../../Components/CustomModal/ModalConnect";
import ModalDisconnect from "../../Components/CustomModal/ModalDisconnect";
import { displayDecimals } from "../../lib/utils/number";
import useToken from "../../hooks/useToken";
import { TOKENS } from "../../constants/addresses";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import Header from "../../Components/Header";
import { useStakingViewModel } from "../../application/controllers/stakingViewModel";
import PredictionPoolCard from "../../Components/PredictionPoolCard";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";
import PredictverseCard from "../../Components/PredictverseCard";

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
interface PredictverseMainContentProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const PredictverseMainContent: FC<PredictverseMainContentProps> = ({
    isSidebarExpanded,
    setIsSidebarExpanded
}) => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const { chainId, active, address } = useWalletViewModel();
    const { balance, decimals } = useToken(TOKENS[chainId].PRED);

    const modal = active ? (
        <ModalDisconnect
            closeModal={() => setModalOpened(false)}
            PREDBalance={displayDecimals(
                ethers.utils.formatUnits(balance, decimals),
                5
            )}
        />
    ) : (
        <ModalConnect closeModal={() => setModalOpened(false)} />
    );

    return (
        <section className="predictverse__main__content">
            {modalOpened && modal}

            <div className="container">
                <Header
                    title="PredictVerse"
                    subtitle="Stake $PRED to earn PRED and other tokens."
                    isSidebarExpanded
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    setModalOpened={setModalOpened}
                />
                <main>
                    <div className="predictverse__card__container">
                        <PredictverseCard id={123} />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default PredictverseMainContent;
