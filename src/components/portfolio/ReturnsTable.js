import React from 'react';
import { Table, Image } from 'react-bootstrap';

const ReturnsTable = () => {
    return (
        <div className="returns-table-container">
            <Table className="returns-table">
                <thead>
                    <tr>
                        <th className="table-header">Crypto Currency</th>
                        <th className="table-header">Returns %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="returns-info ccy-type-details">
                                <Image
                                    src={
                                        'https://i1.wp.com/euanabolic.com/wp-content/uploads/2020/08/bitcoin_PNG48.png?w=968&ssl=1'
                                    }
                                    className="ccy-icon"
                                ></Image>
                                <p className="ccy-name">Bitcoin</p>
                            </div>
                        </td>
                        <td>
                            <p className="returns-info">12%</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="returns-info ccy-type-details">
                                <Image
                                    src={
                                        'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=012'
                                    }
                                    className="ccy-icon"
                                ></Image>
                                <p className="ccy-name">Bitcoin Cash</p>
                            </div>
                        </td>
                        <td>
                            <p className="returns-info">9%</p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ReturnsTable;
