import React from 'react';
import Image from 'react-bootstrap/Image';
import checkIcon from '../../assets/images/Check.png';
import alertIcon from '../../assets/images/alert-circle.png';

const ExchangeStatusBlock = (props) => {
    let status = props.status;
    let statusIcon, statusText, iconClass;
    if (status) {
        statusIcon = checkIcon;
        statusText = 'Exchange Connected';
        iconClass = 'status-positive-icon';
    } else {
        statusIcon = alertIcon;
        statusText = 'Not Connected to Exchange';
        iconClass = 'status-negative-icon';
    }

    const summaryCard = () => {
        if (status) {
            return (
                <div className="portfolio-wrapper">
                    <h1 className="portfolio-value">{props.value}</h1>
                    <div className="transaction-btn-wrapper">
                        <a href="/portfolio" className="transaction-btn btn">
                            View Portfolio
                        </a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="exchange-connect-wrapper">
                    <h3 className="exchange-connect-text">
                        Looks like we you need to connect to an exchange!
                    </h3>
                    <a href="/exchange" className="exchange-btn btn">
                        Connect to an exchange
                    </a>
                </div>
            );
        }
    };

    return (
        <div className="investment-summary-container">
            <h2 className="container-title">My Investments</h2>
            <div className="summary-card">
                {summaryCard()}
                <div className="exchange-status-wrapper">
                    <Image
                        src={statusIcon}
                        className={`status-icon ${iconClass}`}
                    ></Image>
                    <p className="exchange-status">{statusText}</p>
                </div>
            </div>
        </div>
    );
};

export default ExchangeStatusBlock;
