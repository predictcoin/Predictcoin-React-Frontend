import { FC } from "react";

const About: FC = () => {
    return (
        <section className="about">
            <div className="container" id="about-pred">
                <div className="row">
                    <div className="col-sm">
                        <h3>About Predictcoin</h3>
                        <p id="boutp">
                            Predictcoin is an all-in-one price prediction DAO.
                            Stake, Farm, Vote and Predict the prices of various
                            crypto assets. Save, earn passive income and learn a
                            thing or two from professional predictors.
                        </p>
                    </div>
                    <div className="col-sm">
                        <img
                            src="assets/img/Frame.png"
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                </div>
                <div className="row justify-content-center aboutRow">
                    <div className="col-sm-12 col-md-6 col-lg-4 aboutCol my-3">
                        <div
                            className="aboutCon"
                            data-aos="flip-left"
                            data-aos-duration="200"
                            data-aos-offset="0"
                        >
                            <div className="aboutIcon">
                                <img src="icons/database.png" alt="database" />
                            </div>
                            <h4>Stable &amp; Long Term</h4>
                            <p>
                                With 100,000 fixed supply, Predictcoin's $PRED
                                offers a stable and long term gains for holders,
                                predictors and investors. <br />
                                <br />
                                <br />
                                <br />
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 aboutCol  my-3">
                        <div
                            className="aboutCon"
                            data-aos="flip-left"
                            data-aos-duration="200"
                            data-aos-offset="400"
                        >
                            <div className="aboutIcon">
                                <img
                                    src="icons/headphones.png"
                                    alt="headphones"
                                />
                            </div>
                            <h4>LIVE Tech Support</h4>
                            <p>
                                We are available 24/7 to answer your questions
                                and enquiries. You can also join our official
                                Telegram through the link below to get answers
                                from our active community.
                                <br />
                                <br />
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 aboutCol  my-3">
                        <div
                            className="aboutCon"
                            data-aos="flip-left"
                            data-aos-duration="200"
                            data-aos-offset="600"
                        >
                            <div className="aboutIcon">
                                <img
                                    src="icons/dollar-sign.png"
                                    alt="dollar-sign"
                                />
                            </div>
                            <h4>Passive Income</h4>
                            <p id="box-p">
                                Predictcoin provides a lifetime passive income
                                for stakers &amp; farmers as detailed on our
                                Whitepaper. Predictors also earn free PRED once
                                they attain a certain level of experience.
                                <br />
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container whitepaper" id="whitepaper">
                <div className="row">
                    <h1>Whitepaper</h1>
                </div>
            </div>
            <div className="wpbtn">
                <a
                    href="https://predictcoin.finance/images/whitepaper.pdf"
                    id="predwp"
                >
                    PRED Whitepaper
                </a>
            </div>
            <div className="wpbtn2">
                <a
                    href="https://predictcoin.finance/images/BID-Whitepaper.pdf"
                    id="bidwp"
                >
                    BID Whitepaper
                </a>{" "}
                <br />
            </div>
            <div className="container audit pb-20" id="audit">
                <div className="row">
                    <h1>Audit</h1>
                </div>

                <div className="wpbtn">
                    <a
                        href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/August/Predictcoin%20Full%20Smart%20Contract%20Security%20Audit.pdf"
                        id="auditrp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read Audit Report
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
