import { FC, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import useSportPredictionViewModel from '../../application/controllers/useSportPredictionViewModel';
import { setClaimModal } from '../../application/infrastructure/redux/actions/sportPrediction';
import './ClaimWinModal.styles.scss';


const ClaimWinModal: FC = () => {

    const dispatch = useDispatch()

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "claim__win__modal") {
            setClaimModal(false, "")(dispatch)
        }
    };

    const {claim, claimModal} = useSportPredictionViewModel();

    useEffect(() => {
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div id = "claim__win__modal">
            <div className="claim__win__modal__content">
                <button className="close__btn" onClick={() => setClaimModal(false, "")(dispatch)}>
                    <IoIosClose />
                </button>

                <div className="modal__body">
                    <div className="teams__logo">
                        <img src = "/assets/img/manchester_united_logo.png" alt = "team one logo" className="team__logo" />
                        <img src = "/assets/img/napoli_logo.png" alt = "team two logo" className="team__logo" />
                    </div>
                    <h2 className="win__heading">
                        You won this prediction
                    </h2>

                    <p className="win__text">
                        If you claim this win, the corresponding amount of tokens for this win will be added to your CRP wallet
                    </p>

                    <button
                        className="claim__btn"
                        onClick={() => claim([claimModal.matchId])}
                    >
                        Claim win
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ClaimWinModal