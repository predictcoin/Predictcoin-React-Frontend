import { FC } from "react";
import RoadMapDeskTop from '../../../assets/img/desktop.jpg';
import RoadMapMobile from '../../../assets/img/mobile.jpg';

const RoadMap: FC = () => {
    return (
        <section className="roadmap" id="road">
            <div className="container">
                <h1>Roadmap</h1>
                <div id="content-desktop">
                    <img
                        src={RoadMapDeskTop}
                        className="img-fluid"
                        alt="project roadmap"
                    />
                </div>

                <div id="content-mobile">
                    <img
                        src={RoadMapMobile}
                        className="img-fluid"
                        alt="project roadmap for devices"
                    />
                </div>
            </div>
        </section>
    );
};

export default RoadMap;
