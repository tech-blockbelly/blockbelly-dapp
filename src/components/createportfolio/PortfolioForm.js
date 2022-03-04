import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/images/delete.png';

const BasketForm = (props) => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [filename, setFilename] = useState('');

    const handleChange = (e) => {
        let file = e.target.files[0];
        setFilename(file.name);
        setFileUploaded(true);
    };
    const clearFile = (e) => {
        setFilename('');
        setFileUploaded(false);
    };

    let coins = props.coins;

    const { onFormChange: onChange } = props;

    return (
        <div className="coin-selection-container">
            <h3 className="container-title">Index Details</h3>
            <Form className="Basket-form">
                <Form.Group controlId="Basket-ticker-input">
                    <Form.Label>Ticker</Form.Label>
                    <Form.Control
                        className="Basket-ticker-input form-input"
                        type="text"
                        placeholder="Ticker Symbol"
                        name="ticker"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="Basket-name-input">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        className="Basket-name-input form-input"
                        type="text"
                        placeholder="Index Name"
                        name="name"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="Basket-desc-input">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Index description"
                        className="Basket-desc-input  form-input"
                        name="desc"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <hr></hr>
                {/* <h3 className="container-title">Fee Structure</h3> */}
                <Form.Group controlId="min-amount-input">
                    <Form.Label>Initial Price (0-20)</Form.Label>
                    <Form.Control
                        className="min-amount-input form-input"
                        type="number"
                        min="5"
                        placeholder="Amount"
                        name="min_invest"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="distribution-fee-input">
                    <Form.Label>Distribution Fee (%)</Form.Label>
                    <Form.Control
                        className="distribution-fee-input form-input"
                        type="number"
                        placeholder="Distribution Fee"
                        name="distribution_fee"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="distribution-payment-wallet">
                    <Form.Label>Distribution Wallet Address</Form.Label>
                    <Form.Control
                        className="wallet form-input"
                        type="text"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="payment-currency">
                    <Form.Label>Select Payout Currency</Form.Label>
                    <Form.Control
                        as="select"
                        className="select-currency form-select"
                        data-style="btn-info"
                        required>
                        <option>Select fee currency</option>
                        <option>USDC</option>
                        <option>ETH</option>
                        {/* {coins.map((coin, index) => (
                            <option value={coin.value}>{coin.label}</option>
                        ))} */}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="managment-fee-input">
                    <Form.Label>Management Fee (%)</Form.Label>
                    <Form.Control
                        className="managment-fee-input form-input"
                        type="number"
                        placeholder="Management Fee"
                        name="management_fee"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="managment-payment-wallet">
                    <Form.Label>Management Wallet Address</Form.Label>
                    <Form.Control
                        className="wallet form-input"
                        type="text"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="min-amount-input">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        // id="image"
                        accept="image/png, image/jpeg"
                        onChange={props.handleImageChange}
                        // required
                    />
                </Form.Group>

                {/* <div
                    className={`file-uploader-block ${
                        !fileUploaded ? '' : 'hide'
                    }`}>
                    <span
                        className="upload-btn icon-upload"
                        data-target="Basket-logo">
                        Select Basket icon file
                    </span>
                    <input
                        type="file"
                        className="upload-logo Basket-logo"
                        id="upload-logo"
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                    />
                </div>

                <div
                    className={`file-upload-container ${
                        fileUploaded ? '' : 'hide'
                    }`}>
                    <p className="icon-filename">{filename}</p>
                    <Button className="remove-file" onClick={clearFile}>
                        <Image src={deleteIcon} className="delete-icon"></Image>
                    </Button>
                </div>

                <div className="button-wrapper">
                    <Link to="/" className="cancel-btn btn">
                        Cancel
                    </Link>
                    <Button className="continue-btn" type="submit">
                        Continue
                    </Button>
                </div> */}
            </Form>
        </div>
    );
};

export default BasketForm;
