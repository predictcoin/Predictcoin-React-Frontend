import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import LiveMatches from "../../Components/LiveMatches"
import Mypredictions from "./Mypredictions";
import UpcomingMatches from './UpcomingMatches'

interface SportPredictionMainContentProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}
const SportPredictionMainContent: FC<SportPredictionMainContentProps> = ({
    isSidebarExpanded,
    setIsSidebarExpanded
}) => {

    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const { pathname } = useLocation();

    return (
        <section className="sport__prediction__main__content">
            <div className="container">
                <Header
                    title="Sport prediction"
                    subtitle="Predict sport with $CRP, earn in $CRP or $MMF"
                    isSidebarExpanded
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    setModalOpened={setModalOpened}
                />

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
            </div>
        </section>
    );
};

export default SportPredictionMainContent;
