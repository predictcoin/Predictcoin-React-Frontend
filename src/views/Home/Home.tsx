import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Home.styles.scss";
import Hero from "./hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import MarketCap from "./marketCap";
import About from "./about";
import RoadMap from "./roadmap";
import Partners from "./partners";
import Faq from "./faq";
import Footer from "./footer";
import { BiUpArrowAlt } from "react-icons/bi";

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });

        /**
         * Easy on scroll event listener
         */
        const onscroll = (el: HTMLElement | Document, listener: any) => {
            el.addEventListener("scroll", listener);
        };

        let selectHeader = document.querySelector("#header");
        if (selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    selectHeader!.classList.add("header-scrolled");
                } else {
                    selectHeader!.classList.remove("header-scrolled");
                }
            };
            window.addEventListener("load", headerScrolled);
            onscroll(document, headerScrolled);
        }

        /**
         * Back to top button
         */
        let backtotop = document.querySelector(".back-to-top");
        if (backtotop) {
            const toggleBacktotop = () => {                
                if (window.scrollY > 100) {
                    backtotop?.classList.add("active");
                } else {
                    backtotop?.classList.remove("active");
                }
            };
            window.addEventListener("load", toggleBacktotop);
            onscroll(document, toggleBacktotop);
        }

        // live coin watch script
        const script = document.createElement("script");
        script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div id="home">
            <Header />
            <Hero />
            <main id="main">
                <div className="container lappyguy">
                    <img
                        src="assets/img/onlaptop.png"
                        className="img-fluid"
                        alt="a lad on"
                    />
                </div>

                {/* Live coin watch */}
                <div className="container">
                    <div className="row">
                        <div className="predchart">
                            <div
                                className="livecoinwatch-widget-6"
                                lcw-coin="PRED"
                                lcw-base="USD"
                                lcw-period="d"
                                lcw-color-tx="#000000"
                                lcw-color-bg="#ffffff"
                                lcw-border-w="0"
                            ></div>
                        </div>
                    </div>
                </div>
                <MarketCap />
                <About />
                <RoadMap />
                <Partners />
                <Faq />
                <Footer />
            </main>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a
                href="#"
                className="back-to-top d-flex align-items-center justify-content-center"
            >
                <BiUpArrowAlt className="back-to-top-icon" />
            </a>
        </div>
    );
}

export default Home;
