import React from "react";

import "./partner.css";

import as from "../../../assets/partners/as.png";
import babyswap_logo from "../../../assets/partners/babyswap-logo.png";
import bsctimes from "../../../assets/partners/bsctimes.png";
import dapp from "../../../assets/partners/dapp.png";
import dappcom from "../../../assets/partners/dappcom.png";
import ftx from "../../../assets/partners/ftx.png";
import helmet_big from "../../../assets/partners/helmet.png";
import images from "../../../assets/partners/images.png";
import lcw from "../../../assets/partners/lcw.png";
import nomics from "../../../assets/partners/nomics.png";
import squid from "../../../assets/partners/squid.png";
import tech_big from "../../../assets/partners/tech-big.png";
import dersetfinance from "../../../assets/partners/desertfinance.png";

const Partner = () => {
  const pictures = [
    as,
    babyswap_logo,
    bsctimes,
    dapp,
    dersetfinance,
    ftx,
    helmet_big,
    lcw,
    nomics,
    tech_big,
    images,
    dappcom,
    squid
  ];

  return (
    <div className="ptc__partner" id="partner">
      <div className="ptc__partner-heading">
        <h1>Our Partners</h1>
      </div>

      <div className="ptc__partner-images">
        <div className="container">
          <section className="customer-logos slider">
            {pictures.map((pic, index) =>
              <div className="slid">
                <img key={index} src={pic} alt="logo" />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Partner;
