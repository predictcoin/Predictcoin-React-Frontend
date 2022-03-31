import { FC } from "react";
import { Link } from "react-router-dom";
import crono from "../../../assets/cronos2x.png";

const CTA: FC = () => {
    return (
        <section id="cta" className="cta">
            <div className="container" data-aos="zoom-in">
                <div className="row">
                    <div className="col-lg-9 text-center text-lg-start">
                        <h3>
                            Predict crypto-assets, sports games and have fun in
                            the arena while you earn
                        </h3>
                        {/* <p>
							{' '}
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p> */}
                    </div>
                    <div className="col-lg-3 cta-btn-container text-center">
                        <Link
                            className="cta-btn align-middle"
                            to="/prediction"
                        >
                            Launch DApp
                        </Link>
                    </div>

                    <div className="crono-container">
                        <img className="crono-image" src={crono} alt="crono" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
