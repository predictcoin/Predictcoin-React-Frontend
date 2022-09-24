import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ethers } from "ethers";

import ModalConnect from "../../Components/CustomModal/ModalConnect";
import ModalDisconnect from "../../Components/CustomModal/ModalDisconnect";
import { displayDecimals } from "../../lib/utils/number";
import useToken from "../../hooks/useToken";
import { TOKENS } from "../../constants/addresses";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import Header from "../../Components/Header";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";
import PredictverseCard from "../../Components/PredictverseCard";
import usePredictverseViewModel from "../../application/controllers/predictverseViewModel";
import PredictverseCardModel from "../../models/PredictverseCardModel";
import PredictverseBorrowCard from "../../Components/PredictverseBorrowCard";

const PredictverseSkeleton = () => {
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
    const { pathname } = useLocation();
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const { chainId, active } = useWalletViewModel();
    const { initPredictverse, predictverseAvailable, predictverseCardData } =
        usePredictverseViewModel();
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

    useEffect(() => {
        initPredictverse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <section className="predictverse__main__content">
            {modalOpened && modal}

            <div className="container">
                <Header
                    title="PredictVerse"
                    subtitle="Stake and Borrow PRED NFTs to earn PRED."
                    isSidebarExpanded={isSidebarExpanded}
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    setModalOpened={setModalOpened}
                />
                <main>
                    <div className="tab">
                        <Link
                            to="stake"
                            className={`${
                                pathname === "/predictverse" ||
                                pathname === "/predictverse/stake"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            STAKE
                        </Link>
                        <Link
                            to="borrow"
                            className={`${
                                pathname === "/predictverse/borrow"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            BORROW
                        </Link>
                    </div>

                    <Routes>
                        <Route
                            path={"/borrow"}
                            element={
                                <div className="predictverse__card__container">
                                    {predictverseAvailable ? (
                                        (
                                            predictverseCardData as unknown as PredictverseCardModel[]
                                        )?.map((poolCard) => (
                                            <PredictverseBorrowCard
                                                key={poolCard.id}
                                                id={poolCard.id}
                                                apr={poolCard.apr}
                                                earned={poolCard.earned}
                                                stakedNFTs={poolCard.stakedNFTs}
                                                totalNFTStaked={
                                                    poolCard.totalNFTStaked
                                                }
                                                contractUrl={
                                                    poolCard.contractUrl
                                                }
                                                USDStaked={poolCard.USDStaked}
                                                walletUnlockStatus={
                                                    poolCard.walletUnlockStatus
                                                }
                                                USDEarned={poolCard.USDEarned}
                                                staked={poolCard.staked}
                                                NFTAddress={poolCard.NFTAddress}
                                            />
                                        ))
                                    ) : (
                                        <>
                                            <PredictverseSkeleton />
                                            <PredictverseSkeleton />
                                            <PredictverseSkeleton />
                                        </>
                                    )}
                                </div>
                            }
                        />

                        {["/", "/stake"].map((path, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <div className="predictverse__card__container">
                                            {predictverseAvailable ? (
                                                (
                                                    predictverseCardData as unknown as PredictverseCardModel[]
                                                )?.map((poolCard) => (
                                                    <PredictverseCard
                                                        key={poolCard.id}
                                                        id={poolCard.id}
                                                        apr={poolCard.apr}
                                                        earned={poolCard.earned}
                                                        stakedNFTs={
                                                            poolCard.stakedNFTs
                                                        }
                                                        totalNFTStaked={
                                                            poolCard.totalNFTStaked
                                                        }
                                                        contractUrl={
                                                            poolCard.contractUrl
                                                        }
                                                        USDStaked={
                                                            poolCard.USDStaked
                                                        }
                                                        walletUnlockStatus={
                                                            poolCard.walletUnlockStatus
                                                        }
                                                        USDEarned={
                                                            poolCard.USDEarned
                                                        }
                                                        staked={poolCard.staked}
                                                        NFTAddress={
                                                            poolCard.NFTAddress
                                                        }
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    <PredictverseSkeleton />
                                                    <PredictverseSkeleton />
                                                    <PredictverseSkeleton />
                                                </>
                                            )}
                                        </div>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </main>
            </div>
        </section>
    );
};

export default PredictverseMainContent;
