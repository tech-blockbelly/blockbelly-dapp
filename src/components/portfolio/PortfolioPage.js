import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    Card,
    Spinner,
    ListGroupItem,
    InputGroup,
    Form,
} from 'react-bootstrap';
import PortfolioInfo from './PortfolioInfo';
import PortfolioFinancials from './PortfolioFinancials';
import { IoBagCheck, IoCalendar, IoChevronBack } from 'react-icons/io5';

import { getAPIClient } from '../../httpClient';
import { useParams, useHistory } from 'react-router-dom';
import TransactionPage from '../transaction/TransactionPage';
import SipModule from '../transaction/SipModule';
import DistributionTable from './DistributionTable';

const PortfolioPage = (props) => {
    let { type, id } = useParams();
    const history = useHistory();

    const [appState, setAppState] = useState({
        loading: true,
        fund: {},
    });

    const [modalShow, setModalShow] = useState(false);
    const [sipModalShow, setSipModalShow] = useState(false);

    const handleShow = () => setModalShow(true);
    const handleSipShow = () => setSipModalShow(true);

    const endpoint = type == 'cefi' ? 'portfolio' : 'indices';

    useEffect(() => {
        getAPIClient()
            .get(`${endpoint}/${id}`)
            .then((res) => {
                const fund = res.data;
                setAppState({ loading: false, fund: fund || {} });
                console.log(fund);
            });
    }, [setAppState]);

    return (
        <Container fluid className="module-container portfolio-page-container">
            <a onClick={history.goBack}>
                <h2 className="module-title">
                    <IoChevronBack />
                    Explore
                </h2>
            </a>
            {appState.loading ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <Row>
                    <Col xl={5}>
                        <PortfolioInfo
                            fund={appState.fund}
                            type={type}></PortfolioInfo>
                        {/* <Row className="portfolio-info-container portfolio-amt">
                            <Card border="light" style={{ width: '100%' }}>
                                {type == 'cefi' ? (
                                    <Card.Body className="text-center">
                                        <Card.Title>
                                            <h2>
                                                $ {appState.fund.min_invest}
                                            </h2>
                                        </Card.Title>
                                        <Card.Text>Min. Invest Amt.</Card.Text>
                                    </Card.Body>
                                ) : (
                                    <Card.Body className="text-center">
                                        <Card.Title>
                                            <h2>$ {appState.fund.value}</h2>
                                        </Card.Title>
                                        <Card.Text>Current Value</Card.Text>
                                    </Card.Body>
                                )}
                            </Card>
                        </Row> */}
                        <Row>
                            <Col className="portfolio-info-container defi-buy">
                                <ListGroup className="fund-action-list-group">
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="Basket-ticker-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Pay With
                                            </Form.Label>
                                            <Form.Control
                                                className="Basket-ticker-input form-input"
                                                type="text"
                                                placeholder="Ticker Symbol"
                                                name="ticker"
                                                required
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="Basket-name-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Buy
                                            </Form.Label>
                                            <Form.Control
                                                className="Basket-name-input form-input"
                                                type="text"
                                                placeholder="Basket Name"
                                                name="name"
                                                required
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                </ListGroup>
                                {/* <ListGroup className="fund-action-list-group">
                                    <ListGroup.Item className="fund-action-container">
                                        
                                    </ListGroup.Item>
                                    <ListGroup.Item className="fund-action-container">
                                        <Card
                                            border="light"
                                            style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Subtitle>Buy</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </ListGroup.Item>
                                </ListGroup> */}
                            </Col>
                            <Col className="portfolio-info-container portfolio-amt">
                                <ListGroup
                                    flush
                                    style={{
                                        'background-color': 'transparent',
                                    }}>
                                    <ListGroupItem
                                        style={{
                                            'background-color': 'transparent',
                                            border: '0',
                                        }}>
                                        Minimum Receive
                                        <h4>11.808902</h4>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={{
                                            'background-color': 'transparent',
                                            border: '0',
                                        }}>
                                        Network Fee
                                        <h4>0.0102 ETH</h4>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={{
                                            'background-color': 'transparent',
                                            border: '0',
                                        }}>
                                        Platform Fee
                                        <h4>0.0102 ETH</h4>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={{
                                            'background-color': 'transparent',
                                            border: '0',
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
                                onClick={handleShow}
                                className="fund-action-container accent"
                                eventKey="buy">
                                <IoBagCheck /> Buy
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={handleSipShow}
                                className="fund-action-container"
                                eventKey="stake">
                                <IoCalendar /> SIP
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xl={7}>
                        <PortfolioFinancials
                            fund={appState.fund}
                            endpoint={endpoint}
                            type={type}
                        />
                        {type == 'defi' ? (
                            <div>
                                <DistributionTable />
                            </div>
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            )}

            <TransactionPage
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                action="buy"
                type={endpoint}
            />
            <SipModule
                show={sipModalShow}
                onHide={() => setSipModalShow(false)}
                id={id}
                action="stake"
            />
        </Container>
    );
};

export default PortfolioPage;
