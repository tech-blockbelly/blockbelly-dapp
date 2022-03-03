import React from 'react';
import { Table, Image } from 'react-bootstrap';

const CalculationTable = (props) => {
    let calculationData = props.calculationData;
    let fees = props.fees;
    let coinSymbols = props.coinSymbols;

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
                                        src={currency.ccy_icon}
                                        className="ccy-icon"
                                    ></Image>
                                    <p className="ccy-name">{currency.name}</p>
                                </div>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currency.allocation_percent}%
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currency.coin_valuation.toFixed(2)}
                                </p>
                            </td>
                            <td>
                                <p className="ccy-symbol">
                                    {coinSymbols[index]}
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currency.coin_owned}
                                </p>
                            </td>
                            <td>
                                <p className="ccy-info">
                                    {currency.coin_owned_usd}
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
