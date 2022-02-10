import React from 'react';
import Image from 'react-bootstrap/Image';
import arrow from '../../assets/images/Arrow.png';
import { Link } from 'react-router-dom';

const PortfolioTrend = (props) => {
    return (
        <div className="trend-container">
            <h2 className="container-title">Trend</h2>
            <div
                className={`trend-card ${
                    props.status ? 'positive-trend' : 'negative-trend'
                }`}>
                <div className="trend-section">
                    <h4 className="card-title">Index</h4>
                    <Image src={arrow} className="trend-icon"></Image>
                    <h1 className="trend-percentage">{props.percentage}%</h1>
                </div>
                <div className="transaction-btn-wrapper">
                    <Link
                        className="transaction-btn btn"
                        to={`/invest/${props.id}`}>
                        Invest
                    </Link>
                    {/* <a
                        href={`/invest/${props.id}`}
                        className="transaction-btn btn">
                        Invest
                    </a> */}
                    <a
                        href={`/invest/${props.id}`}
                        className="transaction-btn btn">
                        Withdraw
                    </a>
                    <a
                        href="https://blockbelly.com/"
                        className="transaction-btn btn inactive-btn">
                        Stake
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PortfolioTrend;
