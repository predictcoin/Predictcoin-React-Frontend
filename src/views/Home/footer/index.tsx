import { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="footer" id="road">
            <div className="container">
                <div className="row">
                    <div className="col-sm bolt">
                        <a
                            href="https://bscscan.com/token/0xbdd2e3fdb879aa42748e9d47b7359323f226ba22"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src="assets/img/partners/BscScan.png"
                                className="img-fluid footlogo"
                                alt="bscscan"
                            />
                        </a>
                    </div>
                    <div className="col-sm">
                        <div className="socialLinks text-center">
                            <a
                                className="bw"
                                href="https://twitter.com/PredictcoinFin"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-twitter"></i>
                            </a>

                            <a
                                className="bw"
                                href="https://t.me/predictcoin"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-telegram"></i>
                            </a>

                            <a
                                className="bw"
                                href="https://github.com/predictcoin"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-github"></i>
                            </a>
                            <a
                                className="bw"
                                href="https://instagram.com/predictcoin"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a
                                className="bw"
                                href="https://predictcoin.medium.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-medium"></i>
                            </a>
                            <a
                                className="bw"
                                href="mailto:predictcoinfinance@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-envelope"></i>
                            </a>
                            <a
                                className="bw"
                                href="https://reddit.com/r/predictcoinfinance"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fa fa-reddit"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm">
                        <p> Copyright &copy;Predictcoin 2022.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
