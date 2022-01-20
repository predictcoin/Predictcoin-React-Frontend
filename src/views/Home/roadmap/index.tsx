import React from 'react';

import './roadmap.css';

import roadmap from '../../../assets/pics/desktop.jpg';
import mobile from '../../../assets/pics/mobile.jpg';

const RoadMap = () => {
    return (
        <div className="ptc__roadmap" id="roadmap">
            <div className='ptc__roadmap-heading'>
                <h1>Roadmap</h1>
            </div>

            <div className='ptc__roadmap-image'>
                <img className='ptc__desktop' src={roadmap} alt="roadmap" />
            </div>

            <div className='ptc__roadmap-image_mobile'>
                <img src={mobile} alt="roadmap" />
            </div>
        </div>
    )
}

export default RoadMap
