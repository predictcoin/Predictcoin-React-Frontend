import React from 'react';

import './about.css';

import frame from '../../../assets/pics/Frame.png';
import database from '../../../assets/icons/database.png';
import headphones from '../../../assets/icons/headphones.png';
import dollar_sign from '../../../assets/icons/dollar-sign.png';

const About = () => {
    return (
        <div id="about">
            <div className='ptc__about content__padding'>
                <div className='ptc__about-content'>
                    <div>
                        <h1>About Predictcoin</h1>
                        <p>Predictcoin is an all-in-one price prediction DAO. Stake, Farm, Vote and Predict the prices of various crypto assets. Save, earn passive income and learn a thing or two from professional predictors.</p>
                    </div>
                </div>

                <div className='ptc__about-image'>
                    <img src={frame} alt="frameImage" />
                </div>
            </div>

            <div className='ptc__about-card'>
                {/* First Card */}
                <div className='ptc__about-card_content' id='first__card'>
                    <div className="database__icon">
                        <img src={database} alt="database_icon" />
                    </div>

                    <h4>Stable & Long Term</h4>
                    <p>With 100,000 fixed supply, Predictcoin's $PRED offers a stable and long term gains for holders, predictors and investors.</p>
                </div>

                {/* Second Card */}
                <div className='ptc__about-card_content'>
                    <div className="database__icon">
                        <img src={headphones} alt="database_icon" />
                    </div>

                    <h4>LIVE Tech Support</h4>
                    <p>We are available 24/7 to answer your questions and enquiries. You can also join our official Telegram through the link below to get answers from our active community.</p>
                </div>

                {/* Third Card */}
                <div className='ptc__about-card_content' id="third_card">
                    <div className="database__icon">
                        <img src={dollar_sign} alt="database_icon" />
                    </div>

                    <h4>Passive Income</h4>
                    <p>Predictcoin provides a lifetime passive income for stakers & farmers as detailed on our Whitepaper. Predictors also earn free PRED once they attain a certain level of experience.</p>
                </div>
            </div>
        </div>
    )
}

export default About
