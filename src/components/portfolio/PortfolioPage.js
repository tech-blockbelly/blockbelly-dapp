import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Col, Container, Row, Spinner, Image, ListGroup, Form, ListGroupItem
} from "react-bootstrap";
import { IoChevronBack, IoBagCheck, IoCalendar } from "react-icons/io5";

const PortfolioPage = (props) => {
    let { id } = useParams();
    const history = useHistory();

    const [appState, setAppState] = useState({
        // loading: true,
        loading: false,
        fund: {},
    });

    return (
        <Container fluid className="module-container portfolio-page-container">
            <a onClick={history.goBack}>
                <h2 className="module-title">
                    <IoChevronBack /> Explore
                </h2>
            </a>
            { appState.loading ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <Row>
                    <Col className="transaction-column">
                        {/* <div className="fixed-column"> */}
                            <Row>
                                <Col className="portfolio-info-container defi-buy">
                                    <ListGroup className="fund-action-list-group">
                                        <ListGroup.Item style={{ border: "0" }}>
                                            <Form.Group controlId="pay-with-input">
                                                <Form.Label
                                                    style={{
                                                        "font-size": "larger",
                                                    }}>
                                                    Pay With
                                                </Form.Label>
                                                <Form.Control
                                                    className="pay-with-input form-input"
                                                    type="text"
                                                    placeholder="0.000000 ETH"
                                                    name="paymentIndex"
                                                    required
                                                />
                                            </Form.Group>
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ border: "0" }}>
                                            <Form.Group controlId="buy-input">
                                                <Form.Label
                                                    style={{
                                                        "font-size": "larger",
                                                    }}>
                                                    Bid
                                                </Form.Label>
                                                <Form.Control
                                                    className="buy-input form-input"
                                                    type="text"
                                                    placeholder="0.000000 BED"
                                                    name="buyIndex"
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup
                                        flush
                                        className="transaction-breakup-block"
                                    >
                                        <ListGroupItem>
                                            Minimum Receive
                                            <p>0.00000</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Network Fee
                                            <p>0.000 ETH</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Platform Fee
                                            <p>0.000 ETH</p>
                                        </ListGroupItem>

                                    </ListGroup>
                                </Col>
                                
                            </Row>
                            <ListGroup className="fund-action-list-group">
                                <ListGroup.Item
                                    action
                                    // onClick={(e) => {
                                    //     e.preventDefault();
                                    //     window.location.href = `/invest/${id}`;
                                    // }}
                                    // onClick={handleShow}
                                    className="fund-action-container accent"
                                    eventKey="buy">
                                    <IoBagCheck /> Buy
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    // onClick={handleSipShow}
                                    className="fund-action-container"
                                    eventKey="stake">
                                    <IoCalendar /> Recurring Invest
                                </ListGroup.Item>
                            </ListGroup>
                        {/* </div>  */}
                    </Col>
                </Row>
            )}
        </Container>
    )
};

export default PortfolioPage;
