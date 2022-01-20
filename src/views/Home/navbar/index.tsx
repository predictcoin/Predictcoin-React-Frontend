import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import "./navbar.css";

import logo from "../../../assets/pics/logoblue.png";
import { Link } from "react-router-dom";

const Menu = ({ setToggleMenu }: {setToggleMenu: (bool: boolean) => void}) => {
    const [activePage, setActivePage] = useState("market");

    return (
        <>
            <p
                className={activePage === "market" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("market")
                    setToggleMenu(false)
                }}
            >
                <a href="#market">Market</a>
            </p>

            <p
                className={activePage === "about" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("about")
                    setToggleMenu(false)
                }}
            >
                <a href="#about">About</a>
            </p>

            <p
                className={activePage === "whitepaper" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("whitepaper")
                    setToggleMenu(false)
                }}
            >
                <a href="#whitepaper">Whitepaper</a>
            </p>
            <p
                className={activePage === "audit" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("audit")
                    setToggleMenu(false)
                }}
            >
                <a href="#audit">Audit</a>
            </p>
            <p
                className={activePage === "roadmap" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("roadmap")
                    setToggleMenu(false)
                }}
            >
                <a href="#roadmap">Roadmap</a>
            </p>
            <p
                className={activePage === "partner" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("partner")
                    setToggleMenu(false)
                }}
            >
                <a href="#partner">Partners</a>
            </p>

            <p
                className={activePage === "faq" ? "ptc__navbar-active" : ""}
                onClick={() => {
                    setActivePage("faq")
                    setToggleMenu(false)
                }}
            >
                <a href="#faq">FAQ</a>
            </p>
        </>
    );
};

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleCloseMene = () => {
        setToggleMenu(false);
    };

    const handleOpenMene = () => {
        setToggleMenu(true);
    };

    // function scrollIntoView(type) {
    //     console.log("Type: ", type)
    //     pageRefs.current[type].scrollIntoView({ behavior: "smooth" });
    // };

    return (
        <div className="ptc__navbar">
            <div className="ptc__navbar-links">
                <div className="ptc__navbar-links_logo">
                    <a href="/">
                        <img src={logo} alt="logo" />
                    </a>
                </div>

                <div className="ptc__navbar-links_container">
                    <Menu setToggleMenu={setToggleMenu}/>
                </div>

                <div className="ptc__navbar-launch">
                    <Link to="/app">Launch DApp</Link>
                </div>
            </div>

            {/* 
                <div className="ptc__navbar-launch">
                <Link to="/app">Launch DApp</Link>
                </div> 
            */}

            {/* Mobile view */}
            <div className="ptc__navbar-menu">
                {toggleMenu ? (
                    <RiCloseLine
                        className="swirl-in-fwd"
                        color="#2449e8"
                        size={30}
                        onClick={handleCloseMene}
                    />
                ) : (
                    <RiMenu3Line
                        className="swirl-in-fwd"
                        color="#2449e8"
                        size={30}
                        onClick={handleOpenMene}
                    />
                )}
                {toggleMenu && (
                    <div className="ptc__navbar-menu_container slide-in-left">
                        <div className="ptc__navbar-menu_container-links">
                            <Menu setToggleMenu={setToggleMenu} />

                            <div className="ptc__navbar-menu-container-launch">
                                <Link to="/app">Launch DApp</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
