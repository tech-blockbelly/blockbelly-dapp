import React, { useState } from 'react';
import { Image, Row, Col, Form, Button } from 'react-bootstrap';
import Select, { components } from 'react-select';
import AllocationCard from './AllocationCard';

const COINS = [
    {
        value: 'ANT',
        label: 'Aragon',
        image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/ant.svg',
    },
    {
        value: 'XPR',
        label: 'Proton',
        image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/xpr.svg',
    },
    {
        value: 'ELIX',
        label: 'Elixir',
        image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/elix.svg',
    },
    {
        value: 'CMT',
        label: 'Comet',
        image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/cmt.svg',
    },
    {
        value: 'ADA',
        label: 'Cardano',
        image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/ada.svg',
    },
];

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="coin-info">
                <Image 
                    src={props.data.icon} 
                    className="coin-logo" 
                    style={{ 'width': 36 , 'margin-right': 10}}
                />
                {props.data.label}
            </div>
        </components.Option>
    );
};

const SetAllocations = ({
    coins,
    selectedCoins,
    onCoinSelect,
    removeCoinFromSelection,
    changeCoinDistribution,
    className,
    defaultValue
}) => {
    const coinSymbols = Object.keys(selectedCoins);
    const coinsList = coins.filter((coin) =>
        coinSymbols.includes(coin.value),
    );

    return (
        <div className={`coin-allocation-container ${className}`}>
            {/* <SelectCoins coins={appState.coins} onCoinSelect={onCoinSelect} /> */}
            <h3 className="container-title">Select Coins</h3>
            <Select
                className="coin-selector"
                onChange={onCoinSelect}
                options={coins}
                components={{ Option }}
                // isClearable
                // isSearchable
                value={defaultValue}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        border: 'none',
                        borderRadius: '30px',
                        padding: '15px',
                        width: '100%',
                        '&:active, &:focus, &:hover': {
                            border: 'none',
                        },
                    }),
                    options: (styles) => ({
                        ...styles,
                        fontSize: '16px',
                    }),
                }}
            />
            {coinsList.length ? (
                coinsList.map((coin, index) => (
                    <AllocationCard
                        coin={coin}
                        defaultValue={selectedCoins[coin.value]}
                        removeCoinFromSelection={removeCoinFromSelection}
                        changeCoinDistribution={changeCoinDistribution}
                        key={index}
                    />
                ))
            ) : (
                <div className="no-selection">
                    <p className="text-secondary">No Coins Selected</p>
                </div>
            )}
        </div>
    );
};

export default SetAllocations;
