import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';

const FundManagerSettings = () => {
    const [editPayment, setEditPayment] = useState(false);

    const updatePayment = (e) => {
        e.preventDefault();
        if (editPayment) {
            console.log('Save updated payment info');
        }
        setEditPayment(!editPayment);
    };
    return (
        <Container className="fm-settings-container">
            <Row>
                <h2>Fee Structure</h2>
            </Row>
            <Row className="payment-setup-wrapper">
                <Form className="payment-setup-form">
                    <Form.Group controlId="payment-currency">
                        <Form.Label>Select Payout Currency</Form.Label>
                        <Form.Control
                            as="select"
                            className="select-currency form-select"
                            data-style="btn-info"
                            readOnly={!editPayment}
                        >
                            <option>USD</option>
                            <option>BUSD</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="payment-exchange">
                        <Form.Label>Select Exchange</Form.Label>
                        <Form.Control
                            as="select"
                            className="select-exchange form-select"
                            data-style="btn-info"
                            readOnly={!editPayment}
                        >
                            <option>Binance</option>
                            <option>Binance</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="payment-wallet">
                        <Form.Label>Wallet Public Key</Form.Label>
                        <Form.Control
                            className="wallet form-input"
                            type="text"
                            readOnly={!editPayment}
                        />
                    </Form.Group>
                    <Button
                        className="update-btn"
                        type="submit"
                        onClick={(e) => updatePayment(e)}
                    >
                        {`${editPayment ? 'Save' : 'Edit'}`}
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default FundManagerSettings;
