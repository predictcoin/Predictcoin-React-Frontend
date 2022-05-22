import { FC } from "react";
import Slider from "react-slick";
import "./logoslides.scss";

const Partners: FC = () => {

    const settings = {
        slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 3
                }
            }]
      };
    
    return (
        <section className="partnerssec" id="partners">
        <div className="container">
          <h1>Our Partners</h1>
        </div>
        <div className="container">
          <div className="partners">
            <div className="secCon text-center">
            <Slider {...settings} className="customer-logos slider">
                <div className="slide">
                  <img src="assets/img/partners/as.png" alt = "as logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/babyswap-logo.png" alt = "babyswap logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/BscScan.png" id="techrate" alt = "BscScan logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/bsctimes.png" alt = "bsctimes logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/dapp.png" alt = "dapp logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/desertfinance.png" alt = "desertfinance logo"  />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/ftx.png" alt = "ftx logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/helmet.png" alt = "helmet logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/cb.png" alt = "cb logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/coingeko.png" alt = "coingeko logo"  />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/nomics.png" alt = "nomics logo" />
                </div>
                <div className="slide techrate">
                  <img src="assets/img/partners/tech-big.png" alt = "tech-big logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/images.png" alt = "a logo" />
                </div>
                <div className="slide">
                  <img src="assets/img/partners/dappcom.png" alt = "dappcom logo" />
                </div>
                <div className="slide ">
                  <img src="assets/img/partners/squid.png" id="squid" alt = "squid logo" />
                </div>
                <div className="slide ">
                  <img src="assets/img/partners/cc.png" alt = "cc logo" />
                </div>
                <div className="slide ">
                  <img src="assets/img/partners/ccm.png" alt = "ccm logo" />
                </div>
              </Slider>
  
            </div>
          </div>
        </div>
      </section>
    );
};

export default Partners;
