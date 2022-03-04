import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
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
            {/* <h2>Choose your role</h2>
            <div className='link-wrapper'>
                <Link to={`/baskets`} className="finance-btn">Investor</Link>
                <Link to={`/create`} className="finance-btn">Index Creator</Link>
            </div> */}
            <div className="type-block">
                <h2>DeFi</h2>
                <h5>Choose your role</h5>
                <div className="link-wrapper">
                    <Link to={`/baskets`} className="finance-btn">
                        Investor
                    </Link>
                    <Link to={`/create`} className="finance-btn">
                        Index Creator
                    </Link>
                </div>
            </div>
            <div className="type-block">
                <h2>CeFi</h2>
                <h5>Choose your role</h5>
                <div className="link-wrapper">
                    <Link to={`/baskets`} className="finance-btn">
                        Investor
                    </Link>
                    <Link to={`/create`} className="finance-btn">
                        Index Creator
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default LandingPage;
