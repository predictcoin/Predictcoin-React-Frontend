import React from "react";
import "./header.css";

import vr from "../../../assets/pics/onlaptop.png";

const Header = () => {
  console.log("Page render");
  return (
    <div className="ptc__header section__padding">
      <div className="ptc__header-content" id="slideMeLeft">
        <div className="">
          <h1>
            Discover Predictcoin, <br /> Price Prediction Redefined
          </h1>

          <h2>
            Predictcoin is the World's First Crypto-Assets Price Prediction DAO<br />{" "}
            where Winners & Losers earn.
          </h2>
        </div>

        {/* Links */}
        <div className="ptc__header-content_button">
          <a className="ptc__header-button_out ptc__header-button" href='/prediction'>
            Start Predicting
          </a>

          <a className="ptc__header-button_pred ptc__header-button" href='/farming'>
            Earn PRED
          </a>
         
          <a className="ptc__header-button_bid ptc__header-button" href="/stacking">
            Earn BID
          </a>

          <a className="ptc__header-button_bnb ptc__header-button" href="/">
            Earn BNB
          </a>
        </div>
      </div>

      <div className="ptc__header-content-image">
        <img src={vr} alt="vr" className="image__fluid" id='slideMeRight'/>
      </div>
    </div>
  );
};

export default Header;
