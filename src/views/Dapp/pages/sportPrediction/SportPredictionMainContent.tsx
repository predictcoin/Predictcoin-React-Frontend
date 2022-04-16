import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import LiveMatches from "../../Components/LiveMatches"
import Mypredictions from "./Mypredictions";
import UpcomingMatches from './UpcomingMatches'
// import PopularMatches from "../../Components/PopularMatches";
import ModalConnect from "../../Components/CustomModal/ModalConnect";
import ModalDisconnect from "../../Components/CustomModal/ModalDisconnect";
import MatchPredictionModal from "../../Components/CustomModal/MatchPredictionModal";
import { ethers } from "ethers";
import { displayDecimals } from "../../lib/utils/number";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import useToken from "../../hooks/useToken";
import { TOKENS } from "../../constants/addresses";

interface SportPredictionMainContentProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}
const SportPredictionMainContent: FC<SportPredictionMainContentProps> = ({
    isSidebarExpanded,
    setIsSidebarExpanded
}) => {

    const { pathname } = useLocation();
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [MatchPredictionmodalOpened, setMatchPredictionmodalOpened] = useState<boolean>(false);
    const { active, chainId } = useWalletViewModel();
    const { balance, decimals } = useToken(TOKENS[chainId].CRP);

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
    
    

    return (
        <section className="sport__prediction__main__content">
            {modalOpened && modal}
            {MatchPredictionmodalOpened && <MatchPredictionModal closeModal={() => setMatchPredictionmodalOpened(false)} />}
            
            <div className="container">
                <Header
                    title="Sport prediction"
                    subtitle="Predict sport with $CRP, earn in $CRP or $MMF"
                    isSidebarExpanded
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    setModalOpened={setModalOpened}
                />

                <div className="grid__container">
                    <main>
                        <div className="live__matches">
                            <h1 className="title">LIVE MATCHES</h1>
                            <LiveMatches />
                        </div>

                        <div className="tab">
                            <Link
                                to="upcoming-matches"
                                className={`${
                                    pathname === "/sport-prediction" ||
                                    pathname === "/sport-prediction/upcoming-matches"
                                        ? "active"
                                        : ""
                                }`}
                            >
                                UPCOMING MATCHES
                            </Link>
                            <Link
                                to="my-predictions"
                                className={`${
                                    pathname === "/sport-prediction/my-predictions"
                                        ? "active"
                                        : ""
                                }`}
                            >
                                MY PREDICTIONS
                            </Link>
                        </div>

                        <Routes>
                            {["/", "/upcoming-matches"].map((path, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={path}
                                        element={
                                            <UpcomingMatches 
                                                openMatchPredictionModal = {() => setMatchPredictionmodalOpened(true)}
                                            />
                                        }
                                    />
                                );
                            })}
                            <Route
                                path="/my-predictions"
                                element={<Mypredictions />}
                            />
                        </Routes>
                    </main>
                    {/* <aside>
                        <PopularMatches 
                            openMatchPredictionModal = {() => setMatchPredictionmodalOpened(true)}
                        />
                    </aside> */}
                </div>
            </div>
        </section>
    );
};

export default SportPredictionMainContent;
