import React, { useEffect, useState } from 'react';

import { getAPIClient } from '../../httpClient';
import { useParams, useHistory } from 'react-router-dom';

import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import PortfolioInfo from './PortfolioInfo';
import PortfolioFinancials from './PortfolioFinancials';
import { IoBagCheck, IoCalendar, IoChevronBack } from 'react-icons/io5';

const InvestmentPage = (props) => {
    let { id } = useParams();

    const history = useHistory();

    const [appState, setAppState] = useState({
        loading: true,
        fund: {},
        ledger: {},
    });

    useEffect(() => {
        if (appState.ledger.portfolio && appState.ledger.portfolio.id) {
            getAPIClient()
                .get(`portfolio/${appState.ledger.portfolio.id}/`)
                .then((res) => {
                    const fund = res.data;
                    appState.fund = fund || {};
                    setAppState({ loading: false, ...appState });
                    console.log(fund);
                });
        }
    }, [appState.ledger.portfolio]);

    useEffect(() => {
        getAPIClient()
            .get(`portfolio/ledger/${id}/`)
            .then((res) => {
                const ledger = res.data;
                appState.ledger = ledger || {};
                setAppState({ loading: false, ...appState });
                console.log(ledger);
            });
    }, [setAppState]);

    const { ledger } = appState;

    return (
        <Container fluid className="module-container">
            <a onClick={history.goBack}>
                <h2 className="module-title">
                    <IoChevronBack />
                    Analyze
                </h2>
            </a>
            <Row>
                <Col md={5}>
                    <PortfolioInfo
                        fund={appState.fund}
                        ledger={ledger}></PortfolioInfo>
                    <Row className="portfolio-info-container portfolio-amt">
                        <Card border="light" style={{ width: '100%' }}>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    <h2
                                        className={
                                            ledger.value > ledger.amt_invested
                                                ? 'text-success'
                                                : ledger.value <
                                                  ledger.amt_invested
                                                ? 'text-danger'
                                                : ''
                                        }>
                                        $ {(ledger.value || 0).toFixed(2)}
                                    </h2>
                                </Card.Title>
                                <Card.Text>Holding value</Card.Text>
                            </Card.Body>
                        </Card>
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
                            eventKey="sell">
                            <IoBagCheck /> Sell
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            // onClick={onClick}
                            className="fund-action-container"
                            eventKey="stake">
                            <IoCalendar /> Re-Invest
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={7}>
                    <PortfolioFinancials
                        fund={appState.fund}></PortfolioFinancials>
                </Col>
            </Row>
        </Container>
    );
};

export default InvestmentPage;
