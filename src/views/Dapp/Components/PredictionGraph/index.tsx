import { FC } from "react";
import { ResponsiveLine } from "@nivo/line";
import { format } from "date-fns";
import Loader from "../Loader/index.component";
import numFormatter from "../../helpers/numFormatter";

interface PredictionGraphProps {
    min: number;
    max: number;
    data: {
        id: string;
        data: {
            x: string;
            y: number;
        }[];
    }[];
    loadingChart: boolean;
    loadingChartValues: boolean;
}

const PredictionGraph: FC<PredictionGraphProps> = ({
    min,
    max,
    data,
    loadingChart,
    loadingChartValues
}) => {
    return loadingChart || loadingChartValues ? (
        <div className="loader__container">
            <Loader />
        </div>
    ) : (
        <ResponsiveLine
            data={data}
            yScale={{
                type: "linear",
                min: min,
                max: max,
                stacked: true,
                reverse: false
            }}
            yFormat={(value) => `$${Number(value).toFixed(2)}`}
            curve="natural"
            lineWidth={3}
            pointSize={0}
            pointColor="#ffffff"
            pointBorderWidth={3}
            pointBorderColor="#fb49c0"
            enableGridX={false}
            enableGridY={false}
            axisTop={null}
            xFormat={(value) => {
                const date = new Date(value);
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                return format(new Date(year, month, day), "dd MMM Y");
            }}
            tooltip={(value) => {
                const date = new Date(value.point.data.xFormatted);
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const formattedTime = format(
                    new Date(year, month, day),
                    "dd/MM/Y"
                );

                return (
                    <div className="graph__tooltip">
                        <div className="time">
                            <p>Date: {formattedTime}</p>
                        </div>
                        <div className="panel">
                            <p>
                                Price: &nbsp;
                                <b>{`$${numFormatter(+value.point.data.y)}`}</b>
                            </p>
                        </div>
                    </div>
                );
            }}
            axisBottom={{
                tickValues: "every 1 month",
                tickSize: 0,
                tickPadding: 26,
                tickRotation: 90,
                legend: "",
                legendPosition: "middle",
                legendOffset: 32,
                format: function (value: string) {
                    const date = new Date(value);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDay();
                    //@ts-ignore
                    if (this.mergedDates === month) {
                        return "";
                    } else {
                        // @ts-ignore
                        // @ts-ignore
                        this.mergedDates = month;
                        // return 'test';
                        return format(new Date(year, month, day), "MMM");
                    }
                }.bind({ mergedDates: undefined })
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 34,
                tickRotation: 0,
                legend: "",
                legendPosition: "middle",
                legendOffset: -60,
                format: (value) => `$${value}`
            }}
            margin={{ top: 40, right: 40, bottom: 123, left: 75 }}
            axisRight={null}
            useMesh={true}
        />
    );
};

export default PredictionGraph;
