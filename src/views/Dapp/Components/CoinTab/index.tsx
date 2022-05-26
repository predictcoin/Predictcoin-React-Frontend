import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import CoinGecko from "coingecko-api";
import { RiArrowRightDownFill, RiArrowRightUpFill } from "react-icons/ri";
import { IoLogoBitcoin } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { SiBinance, SiDogecoin } from "react-icons/si";
import { ResponsiveLine } from "@nivo/line";

import CoinTabDataModel from "../../models/CoinDataModel";
import "./cointab.styles.scss";
import numFormatter from "../../helpers/numFormatter";
import { format } from "date-fns";

interface CoinTabProps extends CoinTabDataModel {
    active: boolean;
    setActive: Dispatch<SetStateAction<string>>;
}

const CoinTab: FC<CoinTabProps> = ({ id, coinName, active, setActive }) => {
    const [loadingChart, setLoadingChart] = useState<boolean>(true);
    const [graphData, setGraphData] = useState<{ x: string; y: number }[]>([]);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
    const [coinImage, setCoinImage] = useState<string>("");
    const [coinDetails, setCoinDetails] = useState<any>();
    const client = new CoinGecko();

    const searchCoin = async () => {
        setLoadingDetails(true);
        try {
            const coin = await client.coins.fetch(id, {});
            const coinData = coin.data;
            setCoinImage(coinData.image.small);
            setCoinDetails(coinData.market_data);
        } catch (error) {
            console.log(error);
        }
        setLoadingDetails(false);
    };

    const searchCoinChart = async () => {
        setLoadingChart(true);
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
            );
            const coin = await response.json();
            const marketPriceData = coin.prices;
            const truncatedMarketPriceData = marketPriceData;
            const newGraphData: { x: string; y: number }[] = [];
            truncatedMarketPriceData.forEach((data: any) => {
                newGraphData.push({ x: data[0].toString(), y: data[1] });
            });
            setGraphData(newGraphData);
        } catch (error) {
            console.log(error);
        }
        setLoadingChart(false);
    };

    useEffect(() => {
        searchCoin();
        searchCoinChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`coin__tab ${id} ${active ? "active" : ""}`}
            onClick={() => setActive(id)}
        >
            <div className="coin__logo">
                {coinName === "BTC" && <IoLogoBitcoin />}
                {coinName === "ETH" && <FaEthereum />}
                {coinName === "BNB" && <SiBinance />}
                {coinName === "DOGE" && <SiDogecoin />}
                {coinName === "CAKE" && coinImage && (
                    <img className="grayscale" src={coinImage} alt="cake" />
                )}
            </div>
            <div className="coin__details">
                <div className="value__name">
                    <p className="value">
                        {loadingDetails
                            ? "..."
                            : `$${numFormatter(
                                  coinDetails!.current_price?.usd
                              )}`}
                    </p>
                    <p className="name">{coinName}</p>
                </div>
                <div className="chart__rise__fall">
                    <div
                        className={`chart ${
                            Math.sign(
                                coinDetails?.price_change_percentage_24h
                            ) === 1
                                ? "up"
                                : "down"
                        }`}
                    >
                        {!loadingChart && (
                            <ResponsiveLine
                                data={[
                                    {
                                        id: "Coin Prediction Graph",
                                        data: graphData
                                    }
                                ]}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }}
                                yScale={{
                                    type: "linear",
                                    min: "auto",
                                    max: "auto",
                                    stacked: true,
                                    reverse: false
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={null}
                                axisLeft={null}
                                enableGridX={false}
                                enableGridY={false}
                                pointColor={{ theme: "background" }}
                                pointBorderWidth={0}
                                pointBorderColor={{ from: "serieColor" }}
                                pointLabelYOffset={-12}
                                xFormat={(value) => {
                                    const year = new Date(
                                        Number(value)
                                    ).getFullYear();
                                    const month = new Date(
                                        Number(value)
                                    ).getMonth();
                                    const day = new Date(
                                        Number(value)
                                    ).getDate();
                                    return format(
                                        new Date(year, month, day),
                                        "dd MMM Y"
                                    );
                                }}
                                yFormat={(value) =>
                                    `$${Number(value).toFixed(2)}`
                                }
                            />
                        )}
                    </div>
                    <p className="rise__fall">
                        {loadingDetails ? (
                            "..."
                        ) : Math.sign(
                              coinDetails!.price_change_percentage_24h
                          ) === 1 ? (
                            <span className="up">
                                <RiArrowRightUpFill />
                                <span>
                                    {numFormatter(
                                        coinDetails!.price_change_percentage_24h
                                    )}
                                    %
                                </span>
                            </span>
                        ) : (
                            <span className="down">
                                <RiArrowRightDownFill />
                                <span>
                                    {numFormatter(
                                        coinDetails!.price_change_percentage_24h
                                    )}
                                    %
                                </span>
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CoinTab;
