import { FC, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import useSportPredictionViewModel from '../../application/controllers/sportPredictionViewModel';
import { UpcomingMatch } from '../../application/domain/sportPrediction/entity';
import { setPredictMatchModal } from '../../application/infrastructure/redux/actions/sportPrediction';
import './FilledSlotsModal.styles.scss';


const FilledSlotsModal:FC = () => {

    const dispatch = useDispatch()

    const {predictMatchModal, upcomingMatches} = useSportPredictionViewModel()

    const closeModal = () => {
        setPredictMatchModal(null)(dispatch)
    }

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "filled__slot__modal") closeModal();
    };

    const [match, setMatch] = useState<UpcomingMatch>()

    useEffect(() => {

        const targetMatch = upcomingMatches.find(match => match.id === predictMatchModal.id)
        setMatch(targetMatch)

        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div id = "filled__slot__modal">
            <div className="filled__slot__modal__content">
                <button className="close__btn" onClick={closeModal}>
                    <IoIosClose />
                </button>

                <div className="modal__body">
                    <div className="teams__logo">
                        <img src = {match?.teamALogoUri} alt = {match?.teamA + " logo"} className="team__logo" />
                        <img src= {match?.teamBLogoUri} alt={match?.teamB + " logo"} className="team__logo" />
                    </div>
                    <h2 className="heading">
                        Oops, the prediction slots for this match is filled up.
                    </h2>

                    <p className="text">
                        You cannot place your predictions at this time, kindly place predictions on matches with available prediction slots
                    </p>
                </div>
            </div>
        </div>
  )
}

export default FilledSlotsModal