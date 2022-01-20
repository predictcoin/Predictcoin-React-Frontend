import React from "react";

import "./whitepaper.css";

const WhitePaper = () => {
  return (
    <div className="ptc__whitepaper" id='whitepaper'>
      <div className="ptc__whitepaper-section1st">
        <h1>Whitepaper</h1>

        <a className='pred' href={process.env.REACT_APP_PRED_LINK}>PRED Whitepaper</a>
        <a className='bid' href={process.env.REACT_APP_BID_LINK}>BID Whitepaper</a>
      </div>

      <div className="ptc__whitepaper-section2st" id='audit' >
        <h1>Audit</h1>

        <a className='report' href={process.env.REACT_APP_REPORT_LINK}>Read Audit Report</a>
      </div>
    </div>
  );
};

export default WhitePaper;
