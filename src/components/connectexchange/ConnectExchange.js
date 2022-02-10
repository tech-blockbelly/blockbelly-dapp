import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { getAPIClient } from '../../httpClient';

const ConnectExchange = (props) => {
    const [linked, setExchangeLinked] = useState(false);
    const [formData, setFormData] = useState({
        exchange: '',
        api_key: '',
        api_secret: '',
    });

    const { exchange, api_key, api_secret } = formData;

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        console.log(e.target);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            exchange,
            api_key,
            api_secret,
        });
        getAPIClient().post(`profile/linked-exchanges/`, body).then((res) => {
            setExchangeLinked(true);
        });
    };
    if (linked) {
        return <Redirect to={{ pathname: '/settings' }} />;
    }
    return (
        <div className="connect-exchange-container">
            <h2 className="container-title">
                Connect to an Exchange
            </h2>
            <Form className="connect-exchange-form" onSubmit={onSubmit}>
                <Form.Group controlId="exchange">
                    <Form.Label>Exchange</Form.Label>
                    <Form.Control
                        as="select"
                        className="select-exchange form-select"
                        data-style="btn-info"
                        name="exchange"
                        onChange={onChange}>
                        {props.exchanges.map(({ key, value }) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="api-key-input">
                    <Form.Label>API Key</Form.Label>
                    <Form.Control
                        className="api-key-input form-input"
                        type="text"
                        placeholder="API Key"
                        name="api_key"
                        value={api_key}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group controlId="api-secret-input">
                    <Form.Label>API Secret</Form.Label>
                    <Form.Control
                        className="api-secret-input form-input"
                        type="text"
                        placeholder="API Secret"
                        name="api_secret"
                        value={api_secret}
                        onChange={onChange}
                    />
                </Form.Group>
                <div className="button-wrapper">
                    <Link to="/ledger" className="cancel-btn btn">
                        Cancel
                    </Link>
                    <Button className="connect-btn" type="submit">
                        Connect
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ConnectExchange;
