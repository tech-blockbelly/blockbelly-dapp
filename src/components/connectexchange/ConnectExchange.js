import React, { useState, Fragment } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';

const ConnectExchange = (props) => {
    const [formData, setFormData] = useState({
        exchange: '',
        api_key: '',
    });
    const { exchange, api_key } = formData;

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            exchange,
            api_key,
        });
        console.log(body);
        props.onSubmit()
        props.onHide()
    };

    const content = () => {
        let c = (
            <Fragment>
                <Container className="component-container">
                    <Row>
                        <Col md={12}>
                            <h2 className="container-title">Connect to Exchange</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="exchange-modal-container">
                            <Form className="connect-exchange-form" onSubmit={onSubmit}>
                                <Form.Group controlId="exchange">
                                    <Form.Label>Exchange</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="select-exchange form-select"
                                        data-style="btn-info"
                                        name="exchange"
                                        onChange={onChange}
                                    >
                                        <option value={-1}>Select Exchange</option>
                                        <option value={'Binance'}>Binance</option>
                                        <option value={'BitOasis'}>BitOasis</option>
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
                                <div className="button-wrapper">
                                    <Button
                                        className="cancel-btn"
                                        onClick={props.onHide}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="connect-btn"
                                        type="submit"
                                    >
                                        Connect
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
        return c;
    };

    return (
        <Modal
            {...props}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="connect-exchange-modal"
            backdrop="static"
            centered>
            <Modal.Body>{content()}</Modal.Body>
        </Modal>
    );
};

export default ConnectExchange;
