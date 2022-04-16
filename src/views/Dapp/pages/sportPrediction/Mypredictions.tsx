import { FC } from "react";

const Mypredictions: FC = () => {
    const data = {
        predicted: 23,
        round_won: 15,
        round_lost: 5,
        token_balance: "300,345"
    };

    return (
        <div className="sport__prediction__my__predictions">
            <div className="sport__prediction__details">
                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Predicted</p>
                        <p className="value">{data.predicted}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Rounds Won</p>
                        <p className="value">{data.round_won}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Rounds lost</p>
                        <p className="value">{data.round_lost}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Token balance</p>
                        <p className="value">{data.token_balance}</p>
                    </div>
                </div>

                <button className="withdraw__btn">Withdraw balance</button>
            </div>
        </div>
    );
};

export default Mypredictions;
