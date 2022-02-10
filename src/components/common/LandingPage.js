import React from 'react';
import { Container, Button } from 'react-bootstrap';

const LandingPage = () => {
    return (
        <Container className="component-container landing-page">
            <h2>Start Value Investing</h2>
            <Button className="finance-btn">
                <span>Centralize Exchange (Binance)</span>
            </Button>
            <Button className="finance-btn">
                <span>DeFi Exchange</span>
            </Button>
        </Container>
    );
};

export default LandingPage;
