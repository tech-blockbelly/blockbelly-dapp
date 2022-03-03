import React, { useState } from 'react';
import CalculationTable from './CalculationTable';
import { FormControl, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { getAPIClient } from '../../httpClient';

const calculationData = [
    {
        name: 'Bitcoin',
        ccy_icon:
            'https://i1.wp.com/euanabolic.com/wp-content/uploads/2020/08/bitcoin_PNG48.png?w=968&ssl=1',
        allocation_percent: '22%',
        coin_valuation: '$34843',
        coin_owned: '1.3',
        coin_owned_usd: '$233.23',
        platform_fees: '$2.13',
        manager_fees: '$2.13',
    },
    {
        name: 'Ethereum',
        ccy_icon:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/440px-Ethereum-icon-purple.svg.png',
        allocation_percent: '10%',
        coin_valuation: '$17843',
        coin_owned: '23',
        coin_owned_usd: '$12.23',
        platform_fees: '$1.63',
        manager_fees: '$1.63',
    },
    {
        name: 'Litecoin',
        ccy_icon:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Litecoin_Logo.jpg/1200px-Litecoin_Logo.jpg',
        allocation_percent: '18%',
        coin_valuation: '$3189',
        coin_owned: '25',
        coin_owned_usd: '$60.23',
        platform_fees: '$0.63',
        manager_fees: '$0.63',
    },
    {
        name: 'Cardano',
        ccy_icon: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=012',
        allocation_percent: '17%',
        coin_valuation: '$2447',
        coin_owned: '2.5',
        coin_owned_usd: '$25.23',
        platform_fees: '$2.23',
        manager_fees: '$2.23',
    },
    {
        name: 'Ripple',
        ccy_icon:
            'https://e7.pngegg.com/pngimages/422/204/png-clipart-ripple-monero-litecoin-cryptocurrency-money-coin-logo-payment-thumbnail.png',
        allocation_percent: '33%',
        coin_valuation: '$1803',
        coin_owned: '30',
        coin_owned_usd: '$1323',
        platform_fees: '$13.23',
        manager_fees: '$13.23',
    },
];

const fees = {
    platform_fees: '$2.13',
    manager_fees: '$2.13',
};

const TransactionBlock = ({ id, action }) => {
    const [viewDetails, setViewDetails] = useState(false);
    const [formData, setFormData] = useState({
        amount: 0,
    });

    const { amount } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const investInFund = (e) => {
        getAPIClient()
            .post(`portfolio/${id}/invest/`, { amount: amount })
            .then((res) => {
                const investDetails = res.data;
                setAppState({
                    loading: false,
                    investDetails: investDetails || {},
                    investmentBreakdown: Object.values(investDetails.coins),
                    fees: {
                        platform_fees: investDetails.platform_fees.contrib,
                        manager_fees: investDetails.manager_fees.contrib,
                    },
                });
                console.log(res.data);
            });
    };

    const [appState, setAppState] = useState({
        loading: true,
        investDetails: {},
        investmentBreakdown: [],
        fees: {},
    });

    const getInvestmentDetails = () => {
        getAPIClient()
            .get(`portfolio/${id}/invest/?amount=${amount}`)
            .then((res) => {
                const investDetails = res.data;
                setAppState({
                    loading: false,
                    investDetails: investDetails || {},
                    investmentBreakdown: Object.values(investDetails.coins),
                    fees: {
                        platform_fees: investDetails.platform_fees.contrib,
                        manager_fees: investDetails.manager_fees.contrib,
                    },
                });
                console.log(res.data);
            });
    };

    return (
        <div className="transaction-container">
            <div className="transaction-block-wrapper">
                <div className="transaction-input-block">
                    <h2 className="block-title">
                        How much would you want to invest?
                    </h2>
                    <FormControl
                        placeholder="Enter amount"
                        aria-label="Investment Amount"
                        className="amount-input"
                        name="amount"
                        onChange={onChange}
                        value={amount}
                    />
                    <Button
                        className="view-details-btn"
                        onClick={getInvestmentDetails}
                    >
                        View Details
                    </Button>
                </div>
                <CalculationTable
                    calculationData={appState.investmentBreakdown}
                    fees={appState.fees}
                    className={`${
                        Object.keys(appState.investDetails).length ? '' : 'hide'
                    }`}
                />
            </div>
            <div className="button-wrapper">
                <Link to={`/portfolio/${id}`} className="cancel-btn btn">
                    Cancel
                </Link>
                <Button className="proceed-btn btn" onClick={investInFund}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default TransactionBlock;
