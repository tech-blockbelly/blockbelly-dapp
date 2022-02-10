import React, { useState } from 'react';
import { Image, Row, Col, Form, Button } from 'react-bootstrap';
import Select, { components } from 'react-select';
import { Link } from 'react-router-dom';

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="coin-info">
                <Image src={props.data.image} className="coin-logo" />
                {props.data.label}
            </div>
        </components.Option>
    );
};

const SelectCoins = ({ coins, onCoinSelect }) => {

    return (
        <div className="coin-selection-container">
            <h3 className="container-title">
                Select coins to be added to your portfolio
            </h3>
            <Select
                className="coin-selector"
                onChange={onCoinSelect}
                options={coins}
                components={{ Option }}
                isClearable
                isSearchable
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

            {/* <div className="button-wrapper">
				<Link to='/' className="cancel-btn btn">
					Cancel
				</Link>
				<Button className="continue-btn" type="button" onClick={activateLasers}>
					Continue
				</Button>
			</div> */}
        </div>
    );
};

export default SelectCoins;
