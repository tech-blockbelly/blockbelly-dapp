import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Col, Container, Row, Spinner, Image, ListGroup, Form, ListGroupItem
} from "react-bootstrap";
import { IoChevronBack, IoBagCheck, IoCalendar } from "react-icons/io5";
import DistributionTable from "./DistributionTable";
import PortfolioFinancials from "./PortfolioFinancials";

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
                    <Col xl={7} className="information-column">
                        <Row className="title-info-row">
                            <Image src={"https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/bankless_bed.png"} roundedCircle className="icon" />
                            <div className="title-block">
                                <h2>Bankless BED Index</h2>
                                <h5>BED</h5>
                            </div>
                        </Row>
                        <Row className="general-info-row">
                            <Col className="creator-info-column" xl={4}>
                                <Image className='creator-icon' src="https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/managers/bankless_logo.jpeg" roundedCircle />
                                <div>
                                    <p className="creator-name">Bankless HQ</p>
                                    <p className="subtext">Creator</p>
                                </div>
                            </Col>
                            <Col className="market-info-column" xl={4}>
                                <p className="market-cap">$3,017,810.77</p>
                                <p className="subtext">Market Cap</p>
                            </Col>
                        </Row>
                        <Row className="information-row">
                            {/* <PortfolioFinancials 
                                fund={appState.fund}
                                endpoint={""}
                                type={"defi"}
                            /> */}
                            <h4 className="title">Allocations</h4>
                            <DistributionTable />
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Overview</h4>
                            <div className="information-text">
                                Bankless proposed that the Index Coop manage a Set based on an index of Crypto’s most investable assets, BTC, ETH, and DPI, in equal weight.
                                <br /><br />
                                This construction—known as the BED Index or Bankless BED Index—seeks to give safe, passive exposure to a vehicle that captures equal-weighted upside from the most promising use cases and themes in crypto: store of value, programmable money, and decentralized finance.
                            </div>
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Methodology</h4>
                            <div className="information-text">
                                The BED index is meant to track crypto’s top 3 investable assets.<br/><br/>
                                1. Scope: The index includes the top 3 investable assets with real usage and large capitalizations around the theme of blockchain: BTC, ETH, DeFi (DPI).
                                2. Weighting: Neutral construction, equal weight
                                3. Rebalancing: First Friday of every month
                                <br/><br/>
                                The composition is:<br/>
                                - 33.3% Bitcoin<br/>
                                - 33.3% Ether<br/>
                                - 33.3% DPI
                                <br/><br/>
                                The underlying index is rebalanced after the close of trading on the first Friday of each calendar month. The Fund is rebalanced in accordance with its Underlying Index.
                            </div>
                        </Row>
                    </Col>
                    <Col xl={5} className="transaction-column">
                        <div className="fixed-column">
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
                                                    placeholder="1.000000 ETH"
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
                                                    Buy
                                                </Form.Label>
                                                <Form.Control
                                                    className="buy-input form-input"
                                                    type="text"
                                                    placeholder="11.787357 DPI"
                                                    name="buyIndex"
                                                    required
                                                />
                                            </Form.Group>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col className="portfolio-info-container portfolio-amt">
                                    <ListGroup
                                        flush
                                        style={{
                                            "background-color": "transparent",
                                        }}>
                                        <ListGroupItem
                                            style={{
                                                "background-color": "transparent",
                                                border: "0",
                                            }}>
                                            Minimum Receive
                                            <h4>11.787357</h4>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            style={{
                                                "background-color": "transparent",
                                                border: "0",
                                            }}>
                                            Network Fee
                                            <h4>0.0159 ETH</h4>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            style={{
                                                "background-color": "transparent",
                                                border: "0",
                                            }}>
                                            Platform Fee
                                            <h4>0.0159 ETH</h4>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            style={{
                                                "background-color": "transparent",
                                                border: "0",
                                            }}>
                                            Offered By
                                            <h4>Uniswap v4</h4>
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
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    )
};

export default PortfolioPage;
