import React from 'react';

const TransactionStatus = (props) => {
    let status = props.status ? 'Transaction succesful' : 'Transaction failed';
    return (
        <div className="transaction-status-container">
            <h2>Invest</h2>
            <div className="transaction-block-wrapper">
                <div className="status-block">
                    <h1 className="transaction-status">{status}</h1>
                    <h4 className="">Your portfolio is now at</h4>
                    <p className="transaction-amount">{props.amount}</p>
                </div>
                <a href="/ledger" className="back-btn btn">
                    Back to Dashboard
                </a>
            </div>
        </div>
    );
};

export default TransactionStatus;
