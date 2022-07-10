import { FC } from "react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
    return (
        <section
            id="hero"
            className="d-flex align-items-center justify-content-center"
        >
            <div className="container" data-aos="fade-up">
                <div
                    className="row justify-content-center"
                    data-aos="fade-up"
                    data-aos-delay="30"
                >
                    <div className="col-lg-10">
                        <h1>
                            Discover Predictcoin, <br /> Price Prediction
                            Redefined
                        </h1>
                        <h2>
                            Predictcoin is the World's First Crypto-Assets Price
                            Prediction DAO where Winners &amp; Losers earn.
                        </h2>
                        <div className="wrapper">
                            <Link to="/prediction" className="buttonout">
                                Price Prediction
                            </Link>

                            <Link to="/sport-prediction" className="buttonout">
                                Sport Prediction{" "}
                            </Link>
                            <Link to="/staking" className="buttonblue">
                                Earn PRED
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
