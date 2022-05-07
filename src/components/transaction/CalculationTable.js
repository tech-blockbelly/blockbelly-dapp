import React from 'react';
import { Table, Image } from 'react-bootstrap';

const CalculationTable = (props) => {
    let calculationData = props.calculationData;
    let fees = props.fees;
    let amount = props.amount;

    let coinValuation = {
        "LAC": {
            "BTC": "36039.26",
            "SOL": "81.16",
            "ETH": "2686.54",
            "NEAR": "10.63",
            "LUNA": "73.30",
            "ADA": "0.7821",
            "XRP": "0.5988",
            "DOT": "14.23",
            "DAI": "1",
        },
        "MAC": {
            "TRX": "0.08456",
            "LINK": "10.75",
            "LTC": "96.27",
            "MATIC": "1.05",
            "UNI": "7.45",
            "ATOM": "16.98"
        }   
    }
    let currFundCoinValuation = coinValuation[props.fundId];

    return (
        <div
            className={`ccy-table-container table-responsive ${props.className}`}
        >
            <Table responsive className="ccy-table">
                <thead className="ccy-header-container">
                    <tr>
                        <th className="ccy-header">
                            <h5>Name</h5>
                        </th>
                        <th className="ccy-header">
                            <h5>Allocation</h5>
                        </th>
                        <th className="ccy-header">
                            <h5>Last Price (USD)</h5>
                        </th>
                        <th className="ccy-header">
                            <h5>Symbol</h5>
                        </th>
                        <th className="ccy-header">
                            <h5>Amount (Coin)</h5>
                        </th>
                        <th className="ccy-header">
                            <h5>Price (USD)</h5>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {calculationData.map((currency, index) => (
                        <tr key={index}>
                            <td>
                                <div className="ccy-info ccy-type-details">
                                    <Image
                                        src={currency.cLogo}
                                        className="ccy-icon"
                                    ></Image>
                                    <p className="ccy-name">{currency.cName}</p>
                                </div>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currency.wt.toFixed(2)}%
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currFundCoinValuation[currency.cId]}
                                </p>
                            </td>
                            <td>
                                <p className="ccy-symbol">
                                    {currency.cId}
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {
                                        (((currency.wt * amount)/100).toFixed(2)/(currFundCoinValuation[currency.cId])).toFixed(2)
                                    }
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {((currency.wt * amount)/100).toFixed(2)}
                                </p>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4}>
                            <p className="ccy-header text-right">
                                Platform Fees (USD)
                            </p>
                        </td>
                        <td>
                            <p className="ccy-info">{fees.platform_fees}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <p className="ccy-header text-right">
                                Manager Fees (USD)
                            </p>
                        </td>
                        <td>
                            <p className="ccy-info">{fees.manager_fees}</p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default CalculationTable;
