import React, { useState } from "react";
import "./faq.css";

import { Accordion } from "react-bootstrap";

const FAQ = () => {
  const [activeId, setActiveId] = useState("0");

  const toggleActive = (id: string) => {
    if (activeId === id) {
      setActiveId("");
    } else {
      setActiveId(id);
    }

    console.log(id);
  };

  return (
    <div className="ptc__faq" id="faq">
      <div className="ptc__faq-heading">
        <h1>Frequently Asked Question</h1>
      </div>

      {/* Section 1 */}
      <Accordion className="ptc__heading" defaultActiveKey="0" flush>
        <Accordion.Item eventKey="1" onClick={() => toggleActive("1")}>
          <Accordion.Header
            className={
              activeId === "1" ? "ptc__heading-element" : "ptc__heading-content"
            }
          >
            What is the usecase of PRED?
          </Accordion.Header>

          <Accordion.Body>
            <p className="ptc__main-content">
              PRED is the governance token of Predictcoin and can be used to
              stake and earn more PRED, as well as vote and predict the prices
              of crypto assets.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Section 2 */}
        <Accordion.Item eventKey="2" onClick={() => toggleActive("2")}>
          <Accordion.Header
            className={
              activeId === "2" ? "ptc__heading-element" : "ptc__heading-content"
            }
          >
            How to predict the price of Crypto Assets?
          </Accordion.Header>
          <Accordion.Body>
            <p className="ptc__main-content">
              You can start predicting on crypto assets by gaining access to the
              DApp, where you can stake & farm as well.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Section 3 */}
        <Accordion.Item eventKey="3" onClick={() => toggleActive("3")}>
          <Accordion.Header
            className={
              activeId === "3" ? "ptc__heading-element" : "ptc__heading-content"
            }
          >
            How to launch DApp?
          </Accordion.Header>
          <Accordion.Body>
            <p className="ptc__main-content">
              You can launch the DApp by clicking on the "Launch DApp" if you're
              on desktop or the download icon at the top of this page if you're
              on mobile.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" onClick={() => toggleActive("4")}>
          <Accordion.Header
            className={
              activeId === "4" ? "ptc__heading-element" : "ptc__heading-content"
            }
          >
            What is the total supply of PRED?
          </Accordion.Header>
          <Accordion.Body>
            <p className="ptc__main-content">
              PRED is a deflationary token with a total capped supply of 100,000
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQ;
