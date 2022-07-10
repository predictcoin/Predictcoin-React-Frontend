import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

    useEffect(() => {
        let navbarlinks = document.querySelectorAll("#navbar .scrollto");

        const navbarlinksActive = () => {
            let position = window.scrollY + 200;
            navbarlinks.forEach((navbarlink) => {
                const sectionId = navbarlink.getAttribute("href");
                if (!sectionId) return;
                let section = document.querySelector(sectionId) as HTMLElement;
                if (!section) return;
                if (
                    position >= section.offsetTop &&
                    position <= section.offsetTop + section.offsetHeight
                ) {
                    navbarlink.classList.add("active");
                } else {
                    navbarlink.classList.remove("active");
                }
            });
        };

        window.addEventListener("load", navbarlinksActive);
        document.addEventListener("scroll", navbarlinksActive);
    }, []);

    useEffect(() => {
        let navbarlinks = document.querySelectorAll("#navbar .scrollto");
        const handler = () => {
            if (!navbarOpen) return;
            setNavbarOpen(false);
        };

        navbarlinks.forEach((el) => {
            el.addEventListener("click", handler);
        });

        return () => {
            navbarlinks.forEach((el) => {
                el.removeEventListener("click", handler);
            });
        };
    }, [navbarOpen]);

    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center justify-content-lg-between">
                <Link to="/" className="logo me-auto me-lg-0">
                    <img
                        src="assets/img/logo.png"
                        alt="predictcoin logo"
                        className="img-fluid"
                    />
                </Link>

                <nav
                    id="navbar"
                    className={`navbar order-last order-lg-0 ${
                        navbarOpen ? "navbar-mobile" : ""
                    }`}
                >
                    <ul>
                        <li>
                            <a className="nav-link scrollto" href="#market">
                                Market
                            </a>
                        </li>

                        <li>
                            <a className="nav-link scrollto" href="#about-pred">
                                About
                            </a>
                        </li>

                        <li>
                            <a className="nav-link scrollto" href="#whitepaper">
                                Whitepaper
                            </a>
                        </li>

                        <li>
                            <a className="nav-link scrollto" href="#audit">
                                Audit
                            </a>
                        </li>

                        <li>
                            <a className="nav-link scrollto" href="#road">
                                Roadmap
                            </a>
                        </li>

                        <li>
                            <a className="nav-link scrollto" href="#partners">
                                Partners
                            </a>
                        </li>
                        
                        <li>
                            <a className="nav-link scrollto" href="#faq">
                                FAQ
                            </a>
                        </li>
                    </ul>

                    <i
                        className={`bx bx-menu mobile-nav-toggle ${
                            navbarOpen ? "bx-x" : ""
                        }`}
                        onClick={() =>
                            setNavbarOpen((navbarOpen) => !navbarOpen)
                        }
                    />
                </nav>

                <Link to="/prediction" className="get-started-btn">
                    Launch DApp
                </Link>
            </div>
        </header>
    );
};

export default Header;
