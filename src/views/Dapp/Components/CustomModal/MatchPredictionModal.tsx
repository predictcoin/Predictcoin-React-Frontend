import { FC, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { GoDash } from "react-icons/go";
import "./MatchPredictionModal.styles.scss";

interface MatchPredictionModalProps {
    closeModal: () => void;
}

const MatchPredictionModal: FC<MatchPredictionModalProps> = ({
    closeModal
}) => {
    const closeModalFunc = (e: any) => {
        if (e.target?.id === "match__prediction__modal") closeModal();
    };

    useEffect(() => {
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="match__prediction__modal">
            <div className="match__prediction__modal__content">
                <button className="close__btn" onClick={closeModal}>
                    <IoIosClose />
                </button>

                <div className="modal__head">
                    <h2>MATCH PREDICTIONS</h2>
                    <p>
                        You will be charged 10 CRO for each pool entered and
                        earn x10 (100 CRO) when you win.
                    </p>

                    <div className="modal__body">
                        <div className="team__details">
                            <div className="team__one">
                                <img
                                    src="/assets/img/manchester_united_logo.png"
                                    alt="team two logo"
                                />
                                <p>MAN</p>
                            </div>
                            <GoDash className="seperator" />
                            <div className="team__two">
                                <img
                                    src="/assets/img/napoli_logo.png"
                                    alt="team one logo"
                                />
                                <p>MAN</p>
                            </div>
                        </div>
                        <form className="predict__form">
                            <div className="inputs__container">
                                <label htmlFor="team__one">
                                    <input
                                        type="number"
                                        name="team__one"
                                        placeholder="0"
                                    />
                                </label>
                                <p className="text">
                                    Predict the scores (1-100)
                                </p>
                                <label htmlFor="team__two">
                                    <input
                                        type="number"
                                        name="team__two"
                                        placeholder="0"
                                    />
                                </label>
                            </div>
                            <button>Predict scores</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPredictionModal;
