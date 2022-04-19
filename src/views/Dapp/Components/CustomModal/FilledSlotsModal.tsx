import { FC, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'
import './FilledSlotsModal.styles.scss';

interface FilledSlotsModalProps {
    closeModal: () => void
}

const FilledSlotsModal:FC<FilledSlotsModalProps> = ({closeModal}) => {

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "filled__slot__modal") closeModal();
    };

    useEffect(() => {
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
                        <img src = "/assets/img/manchester_united_logo.png" alt = "team one logo" className="team__logo" />
                        <img src = "/assets/img/napoli_logo.png" alt = "team two logo" className="team__logo" />
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