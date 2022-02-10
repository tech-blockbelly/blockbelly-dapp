import React from 'react';
import TransactionStatus from './TransactionStatus';

const TransactionPage = () => {
    return (
        <div className="component-container">
            <TransactionStatus
                status={'Succes'}
                amount={1200}></TransactionStatus>
        </div>
    );
};

export default TransactionPage;
