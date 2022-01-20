import React from "react";
import "./footer.css";

import BscScan from "../../../assets/partners/BscScan.png";

const Footer = () => {
  return (
    <div className="ptc__footer">
      <img src={BscScan} alt="Logo" className="ptc__footer-image" />

      <div className="ptc__footer-links">
        <a href={process.env.REACT_APP_TWITTER}>
          <i className="fa fa-twitter" />
        </a>

        <a href={process.env.REACT_APP_TELEGRAM}>
          <i className="fa fa-telegram" />
        </a>

        <a href={process.env.REACT_APP_GITHUB}>
          <i className="fa fa-github" />
        </a>

        <a href={process.env.REACT_APP_IG}>
          <i className="fa fa-instagram" />
        </a>

        <a href={process.env.REACT_APP_MEDIUM}>
          <i className="fa fa-medium" />
        </a>

        <a href={process.env.REACT_APP_GMAIL}>
          <i className="fa fa-envelope" />
        </a>

        <a href={process.env.REACT_APP_REDDIT}>
          <i className="fa fa-reddit" />
        </a>
      </div>

      <div className="ptc__footer-copy">
        Copyright ©Predictcoin 2021
      </div>
    </div>
  );
};

export default Footer;
