import React, { useState, useEffect } from "react";
import axios from "axios";

import "./market.css";
import LineChart from "./Line";

const Market = () => {
  const [apiData, setApiData] = useState([]);
  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(process.env.REACT_APP_COINGEC_API!);
      setApiData(data);
    };

    getData();
  }, []);

  return (
    <section className="ptc__market" id="market">
      <div className="ptc__market-text">
        <h1>Today's Cryptocurrency Prices by Market Cap</h1>
        <p>
          {" "}Have a sneak peek at the top crypto assests before launching the
          DApp to predict
        </p>
      </div>

      <div className="ptc__market-table">
        <table id="customers">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Price</th>
              <th style={{ textAlign: 'center' }}>24 %</th>
              <th style={{ textAlign: 'center' }}>7d %</th>
              <th style={{ textAlign: 'center' }}>Market Cap</th>
              <th style={{ textAlign: 'center' }}>Volume(24)</th>
              <th style={{ textAlign: 'center' }}>Circulating Supply</th>
              <th style={{ textAlign: 'center' }}>Last 7 Days</th>
            </tr>
          </thead> 
          <tbody>
            {apiData.map((data: any) => {
              return (
                <tr key={data.id}>
                  <td>
                    {data.name.toUpperCase()} {data.symbol.toUpperCase()}
                  </td>
                  <td>
                    {formatter.format(data.current_price)}
                  </td>
                  <td>
                    {formatter.format(data.price_change_24h.toFixed(2))}
                  </td>
                  <td>
                    {formatter.format(
                      data.price_change_percentage_7d_in_currency
                    )}
                  </td>
                  <td>
                    {formatter.format(data.market_cap)}
                  </td>
                  <td>
                    {formatter.format(data.total_volume)}
                  </td>
                  <td>
                    {formatter.format(
                      Math.trunc(data.total_volume / data.current_price)
                    )}{" "}
                    {data.symbol.toUpperCase()}
                  </td>
                  <td style={{marginLeft: "10rem"}}>
                    <LineChart
                      dataset={data.sparkline_in_7d.price}
                      _7dChange={data.price_change_percentage_7d_in_currency}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Market;
