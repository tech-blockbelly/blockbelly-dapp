import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Container className="component-container landing-page">
            {/* <h2>Start Value Investing</h2>
            
            <Button className="finance-btn">
                <span>Centralize Exchange (Binance)</span>
            </Button>
            <Button className="finance-btn">
                <span>DeFi Exchange</span>
            </Button> */}
            <h2>Choose your role</h2>
            <div className="link-wrapper">
                <Link to={`/baskets`} className="finance-btn">
                    Investor
                </Link>
                <Link to={`/create`} className="finance-btn">
                    Methodologist
                </Link>
            </div>
        </Container>
    );
};

export default LandingPage;
