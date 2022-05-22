import axios from "axios";
import { FC, useEffect, useState } from "react";
import MarketCapRow from "./MarketCapRow";


const MarketCap: FC = () => {
    const [coinsData, setCoinsData] = useState([])
    useEffect(() => {
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d").then(response => {
          if(response.data.length) {
            const data = response.data.map((coinData:any, index:number) => {
                const {
                    name,
                    symbol,
                    current_price,
                    market_cap,
                    total_volume,
                    circulating_supply,
                    price_change_percentage_24h_in_currency: _24hChange,
                    price_change_percentage_7d_in_currency: _7dChange,
                    sparkline_in_7d,
                  } = coinData;

                  return {
                    name,
                    symbol,
                    current_price,
                    market_cap,
                    total_volume,
                    circulating_supply,
                    _24hChange,
                    _7dChange,
                    sparkline_in_7d
                  }
            })
            setCoinsData(data);
            
          }
      })
    }, [])
    
    return (
        <section className="currencies" id="market">
            <div className="marketCap" id="marketCapSec">
                <div className="container">
                <div className="marketCapCon">
                    <h1 className="header-text">Today's Cryptocurrency Prices by Market Cap </h1>
                    <p id="subtext"> Have a sneak peek at the top crypto assests before launching the DApp to predict their prices.</p>
                    <div className="marketCapTable tableScroll dbTable">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>7d %</th>
                            <th>Market Cap</th>
                            <th className="text-right">Volume(24h)</th>
                            <th>Circulating Supply</th>
                            <th className="text-center">Last 7 Days</th>
                        </tr>
                        </thead>
                        <tbody className="custom-scroll scroll-xl">
                            {!!coinsData.length && coinsData.map((coinData, index) => <MarketCapRow key = {index} {...coinData} />)}
                        </tbody>
                    </table>
                    </div>

                </div>
                </div>
            </div>
        </section>
    );
};

export default MarketCap;
