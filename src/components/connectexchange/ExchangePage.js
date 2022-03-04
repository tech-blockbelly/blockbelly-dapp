import React from 'react';
import ConnectExchange from './ConnectExchange';
import { Container, Row, Col } from 'react-bootstrap';

const exchanges = [
    { value: 'Select an exchange', key: '' },
    { value: 'Binance', key: 'binance' },
];

const ExchangePage = () => {
    return (
        <Container className="component-container exchange-page">
            <Row>
                <Col lg={8}>
                    <ConnectExchange exchanges={exchanges} />
                </Col>
            </Row>
        </Container>
    );
};

export default ExchangePage;
