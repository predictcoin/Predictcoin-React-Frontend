import { FC, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
import './ClaimWinModal.styles.scss';

interface ClaimWinModalProp {
    closeModal: () => void
}

const ClaimWinModal: FC<ClaimWinModalProp> = ({closeModal}) => {

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "claim__win__modal") closeModal();
    };

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
                <button className="close__btn" onClick={closeModal}>
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

                    <button className="claim__btn">
                        Claim win
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ClaimWinModal