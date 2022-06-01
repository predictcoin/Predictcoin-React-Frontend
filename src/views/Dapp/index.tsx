import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prediction from "./pages/prediction";
import SportPrediction from "./pages/sportPrediction";
import "./appdashboard.styles.scss";
import { Provider } from "react-redux";
import { store } from "./application/infrastructure/redux/stores";
import { useWalletViewModel } from "./application/controllers/walletViewModel";
import Staking from "./pages/staking";
import Farming from "./pages/farming";

const AppDashboard: FC = () => {
    const InternalComponent = () => {
        // check if wallet connected before
        const { active, connect } = useWalletViewModel();
        useEffect(() => {
            const wallet = localStorage.getItem("wallet");
            if (!active && wallet !== null) {
                connect(wallet);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <>
                <div className="app__dashboard">
                    <Routes>
                        <Route path="/prediction/*" element={<Prediction />} />
                        <Route path="/sport-prediction/*" element={<SportPrediction />} />
                        <Route path="/farming" element={<Farming />} />
                        {["/", "/staking/*"].map((path, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={<Staking />}
                                />
                            );
                        })}
                    </Routes>

                    <ToastContainer
                        position="bottom-right"
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeButton={false}
                        rtl={false}
                        pauseOnFocusLoss
                    />
                </div>
            </>
        );
    };

    return (
        <Provider store={store}>
            <InternalComponent />
        </Provider>
    );
};

export default AppDashboard;
