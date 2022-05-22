import { FC } from "react";
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface Params {
    name: string;
    symbol: string;
    _24hChange: number;
    _7dChange: number;
    market_cap: number;
    total_volume: number;
    current_price: number;
    circulating_supply: number;
    sparkline_in_7d: any
}
const MarketCapRow: FC<Params> = ({
    name,
    symbol,
    _24hChange,
    _7dChange,
    market_cap,
    total_volume,
    current_price,
    circulating_supply,
    sparkline_in_7d
}) => {
    const formatter = new Intl.NumberFormat("en-US");
    const values = [sparkline_in_7d.price.map((price:any) => parseInt(price)), _7dChange];

    
    return (
        <tr>
            <td>{`${name.toUpperCase()} ${symbol.toUpperCase()}`}</td>
            <td>
                <span>{`$${formatter.format(current_price)}`}</span>
            </td>
            <td>
                <span className={_24hChange < 0 ? "text-red" : "text-green"}>
                    ${formatter.format(_24hChange)}%
                </span>
            </td>
            <td>
                <span className={_7dChange < 0 ? "text-red" : "text-green"}>
                    ${formatter.format(_7dChange)}%
                </span>
            </td>
            <td>$${formatter.format(market_cap)}</td>
            <td className="text-right">
                <div className="volFVal">
                    $${formatter.format(total_volume)}
                </div>
                <div className="volCVal text-lightGray">
                    $
                    {formatter.format(
                        parseInt(
                            (total_volume / current_price) as unknown as string
                        )
                    )}{" "}
                    ${symbol.toUpperCase()}
                </div>
            </td>
            <td>
                {" "}
                ${formatter.format(circulating_supply)} ${symbol.toUpperCase()}
            </td>
            <td className="text-center">
                <span className="">
                <Sparklines data={values[0]}>
                    <SparklinesLine color= {Number(values[1]) < 0 ? "red" : "green"} />
                </Sparklines>
                </span>
            </td>
        </tr>
    );
};

export default MarketCapRow;
