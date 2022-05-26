import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import FilledSlotsModal from "../../Components/CustomModal/FilledSlotsModal";

interface SportPredictionMainContentProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}
const SportPredictionMainContent: FC<SportPredictionMainContentProps> = ({
    setIsSidebarExpanded
}) => {

    const {getUserPastPrediction, getUpcomingMatches, getSportPredicitonData, predictMatchModal} = useSportPredictionViewModel()

    const { pathname } = useLocation();
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const { active, chainId, address } = useWalletViewModel();
    const { balance, decimals } = useToken(TOKENS[chainId].PRED);
    

    useEffect(() => {
        getSportPredicitonData()
        getUpcomingMatches()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getUserPastPrediction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, active])
    

   

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
        <section className="sport__prediction__main__content">
            {modalOpened && modal}
            {predictMatchModal.id && !predictMatchModal.isFilled && <MatchPredictionModal predBalance = {balance} />}
            {predictMatchModal.id && predictMatchModal.isFilled && <FilledSlotsModal />}
            
            <div className="container">
                <Header
                    title="Sport prediction"
                    subtitle="Sport prediction with $PRED"
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
                                            <UpcomingMatches />
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
