import { FC, useEffect, useRef, ReactText, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { GoDash } from "react-icons/go";
import "./MatchPredictionModal.styles.scss";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import { useDispatch } from "react-redux";
import { setPredictMatchModal } from "../../application/infrastructure/redux/actions/sportPrediction";
import { UpcomingMatch } from "../../application/domain/sportPrediction/entity";
import { formatEther } from "ethers/lib/utils";
import { toast } from "react-toastify";
import { ToastBody, STATUS, TYPE } from "../Toast";
import useToken from "../../hooks/useToken";
import { SPORT_PREDICTION_ADDRESSES, TOKENS } from "../../constants/addresses";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import { ethers } from "ethers";



const MatchPredictionModal: FC = () => {

    const {predict, predictMatchModal, upcomingMatches, rewardMultiplier, predictionAmount} = useSportPredictionViewModel()
    const { active, chainId } = useWalletViewModel();
    const {allowances, getAllowance, approve} = useToken(TOKENS[chainId].CRP)

    const dispatch = useDispatch()
    const pendingToast = useRef("" as ReactText);

    const closeModal = () => {
        setPredictMatchModal(null)(dispatch)
    }
    const closeModalFunc = (e: any) => {
        if (e.target?.id === "match__prediction__modal") closeModal();
    };
    const [match, setMatch] = useState<UpcomingMatch>()
    const [predictionData, setPredictionData] = useState<{teamA: string, teamB: string}>({teamA: "", teamB: ""})

    useEffect(() => {
        const targetMatch = upcomingMatches.find(match => match.id === predictMatchModal.id)
        setMatch(targetMatch)

        getAllowance(SPORT_PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof SPORT_PREDICTION_ADDRESSES])
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!/^[0-9]\d*$/.test(event.target.value) && event.target.value !== "") return event.preventDefault()
        if(Number(event.target.value) > 100) return event.preventDefault()
        return setPredictionData(prev => ({...prev, [event.target.name]: event.target.value})) 
    } 

    const handlePredict = async (event: React.MouseEvent<HTMLElement>) => {        
        event.preventDefault();
        if(!active) {
            const body = ToastBody("You are not connected. Please connect your wallet to place predicition", STATUS.ERROR, TYPE.ERROR)
            toast.dismiss(pendingToast.current);
            return toast(body);
        }
        if(!predictionData.teamA || !predictionData.teamB) {
            const body = ToastBody("Please enter your score prediction for both teams", STATUS.ERROR, TYPE.ERROR)
            toast.dismiss(pendingToast.current);
            return toast(body);
        }

        try {
            if(predictionAmount.gt(allowances[SPORT_PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof SPORT_PREDICTION_ADDRESSES]])) {
                await approve(SPORT_PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof SPORT_PREDICTION_ADDRESSES], ethers.constants.MaxUint256)
            }
    
            const callbacks = {
                successfull: () => {
                    closeModal();
                },
                failed: () => {
                    closeModal();
                }
            }
            
            predict(match?.id as string, match?.teamA as string, match?.teamB as string, Number(predictionData.teamA), Number(predictionData.teamB), callbacks)
        }catch(err) {
            console.error(err)
            closeModal();
        }
        
    }

    return (
        <div id="match__prediction__modal">
            <div className="match__prediction__modal__content">
                <button className="close__btn" onClick={closeModal}>
                    <IoIosClose />
                </button>

                <div className="modal__head">
                    <h2>MATCH PREDICTIONS</h2>
                    <p>
                        {`You will be charged ${formatEther(predictionAmount)} CRO for each pool entered and
                        earn X${rewardMultiplier} (${Number(formatEther(predictionAmount)) * rewardMultiplier} CRO) when you win.`}
                    </p>

                    <div className="modal__body">
                        <div className="team__details">
                            <div className="team__a">
                                <img
                                    src= {match?.teamALogoUri}
                                    alt={match?.teamA + " logo"}
                                />
                                <p>{match?.teamA}</p>
                            </div>
                            <GoDash className="seperator" />
                            <div className="team__b">
                                <img
                                    src= {match?.teamBLogoUri}
                                    alt={match?.teamB + " logo"}
                                />
                                <p>{match?.teamB}</p>
                            </div>
                        </div>
                        <form className="predict__form">
                            <div className="inputs__container">
                                <label htmlFor="teamA">
                                    <input
                                        type="text"
                                        name="teamA"
                                        placeholder="0"
                                        value={predictionData.teamA}
                                        onChange = {handleOnchange}
                                    />
                                </label>
                                <p className="text">
                                    Predict the scores (1-100)
                                </p>
                                <label htmlFor="teamB">
                                    <input
                                        type="text"
                                        name="teamB"
                                        placeholder="0"
                                        value={predictionData.teamB}
                                        onChange = {handleOnchange}
                                    />
                                </label>
                            </div>
                            <button onClick = {handlePredict}>Predict scores</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPredictionModal;
