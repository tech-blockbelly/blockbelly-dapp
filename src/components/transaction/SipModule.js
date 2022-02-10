import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
// import { getAPIClient } from '../../httpClient';

const SipModule = (props) => {
    let { id, action } = props;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="sip-modal"
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Body>
                <Container className="component-container sip-modal-container">
                    <Row>
                        <Col md={12} className="sip-container">
                            <div className="sip-block-wrapper">
                                <div className="sip-input-block">
                                    <h2 className="block-title">
                                        Setup your SIP
                                    </h2>
                                    <Form.Group controlId="sip-amount">
                                        <Form.Label>SIP Amount</Form.Label>
                                        <Form.Control
                                            className="amount-input form-input"
                                            type="text"
                                            name="amount"
                                            placeholder="Enter amount"
                                            aria-label="Investment Amount"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="sip-date">
                                        <Form.Label>Select SIP Date</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="select-sip-date form-select"
                                            data-style="btn-info">
                                            {[...Array(28)].map((e, i) => {
                                                return (
                                                    <option key={i}>
                                                        {i + 1}
                                                    </option>
                                                );
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="button-wrapper">
                <Button onClick={props.onHide} className="cancel-btn btn">
                    Cancel
                </Button>
                <Button className="proceed-btn btn">Setup</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SipModule;
