import { FC } from "react";

const RoadMap: FC = () => {
    return (
        <section className="roadmap" id="road">
            <div className="container">
                <h1>Roadmap</h1>
                <div id="content-desktop">
                    <img
                        src="assets/img/desktop.jpg"
                        className="img-fluid"
                        alt="project roadmap"
                    />
                </div>
                <div id="content-mobile">
                    <img
                        src="assets/img/mobile.jpg"
                        className="img-fluid"
                        alt="project roadmap for devices"
                    />
                </div>
            </div>
        </section>
    );
};

export default RoadMap;
