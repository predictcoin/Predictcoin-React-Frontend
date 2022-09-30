import { Dispatch, FC, SetStateAction, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {GiWorld} from 'react-icons/gi';

import FarmingIcon from "../../../../assets/appSvgs/FarmingIcon";
import StakingIcon from "../../../../assets/appSvgs/StakingIcon";
import PredictionCoin from "../../../../assets/appSvgs/PredictionCoin";
import SportPredictionIcon from "../../../../assets/appSvgs/SportPredictionIcon";
import CACoins from "../../../../assets/appSvgs/CACoins";
import "./sidebar.styles.scss";
import { shortenAddress } from "../../lib/utils/address";

interface SidebarProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({
    isSidebarExpanded,
    setIsSidebarExpanded
}) => {
    const { pathname } = useLocation();
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    const copyToClipboard = (containerId: string) => {
        let range = document.createRange();
        range.selectNode(document.querySelector(containerId)!);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);
        document.execCommand("copy");
        window.getSelection()!.removeAllRanges();
        copyButtonRef.current!.innerHTML = "Address copied";

        setTimeout(() => {
            copyButtonRef.current!.innerHTML = "click to copy CA";
        }, 800);
    };

    return (
        <section id="sidebar" className={isSidebarExpanded ? "expand" : ""}>
            <nav>
                <button
                    className="hamburger"
                    onClick={() =>
                        setIsSidebarExpanded(
                            (isSidebarExpanded) => !isSidebarExpanded
                        )
                    }
                >
                    <div
                        id="nav-icon1"
                        className={isSidebarExpanded ? "open" : ""}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <ul>
                    <li>
                        <NavLink
                            to="/prediction"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <div className="icon">
                                <PredictionCoin />
                            </div>
                            <span>Price Prediction</span>
                            <div className="border__active"></div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sport-prediction"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <div className="icon">
                                <SportPredictionIcon />
                            </div>
                            <span>Sport Prediction</span>
                            <div className="border__active"></div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/predictverse"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <div className="icon">
                                <GiWorld size={16}/>
                            </div>
                            <span>PredictVerse</span>
                            <div className="border__active"></div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/staking"
                            className={({ isActive }) =>
                                isActive || pathname === "/app" ? "active" : ""
                            }
                        >
                            <div className="icon">
                                <StakingIcon />
                            </div>
                            <span>Staking</span>
                            <div className="border__active"></div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/farming"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <div className="icon">
                                <FarmingIcon />
                            </div>
                            <span>Farming</span>
                            <div className="border__active"></div>
                        </NavLink>
                    </li>
                    {/* <li>
						<NavLink
							to='##'
							className={({ isActive }) =>
								isActive ? 'active not__available' : ''
							}
						>
							<div className='icon'>
								<SwapIcon />
							</div>
							<div className='coming__soon'>
								<span>Swap</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li> */}
                    {/* <li>
						<NavLink
							to='##'
							className={({ isActive }) =>
								isActive ? 'active not__available' : ''
							}
						>
							<div className='icon'>
								<VotingIcon />
							</div>
							<div className='coming__soon'>
								<span>Voting</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li> */}

                    {/* <li>
						<NavLink
							to='##'
							className={({ isActive }) =>
								isActive ? 'active not__available' : ''
							}
						>
							<div className='icon'>
								<PredictBidIcon />
							</div>
							<div className='coming__soon'>
								<span>Predict $BID</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
					</li> */}

                    {/* <li>
						<NavLink
							to='##'
							className={({ isActive }) =>
								isActive ? 'active not__available' : ''
							}
						>
							<div className='icon'>
								<IPOIcon />
							</div>
							<div className='coming__soon'>
								<span>IPO</span>
								<span className='coming__soon'>Coming soon</span>
							</div>
							<div className='border__active'></div>
						</NavLink>
						</li> */}
                </ul>

                <div className="CA__section">
                    <div className="blur"></div>
                    <div className="coins__bg">
                        <CACoins />
                    </div>
                    <div className="CA__section__content">
                        <p id="address" className="address hidden">
                            0xbdD2E3fdb879AA42748E9D47b7359323f226BA22
                        </p>
                        <p className="address">
                            {shortenAddress(
                                "0xbdD2E3fdb879AA42748E9D47b7359323f226BA22"
                            )}
                        </p>
                        <button
                            className="copy__CA"
                            onClick={() => copyToClipboard("#address")}
                            ref={copyButtonRef}
                        >
                            click to copy CA
                        </button>
                        <img
                            src="/assets/img/predcoin_logo.png"
                            alt="predict-logo-sidebar"
                        />
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Sidebar;
