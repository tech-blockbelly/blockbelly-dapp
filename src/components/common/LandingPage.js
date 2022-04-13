import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bbLogo from '../../assets/images/indexLogos/BB.png'

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
            <div className='header-block'>
                <Image
                    src={bbLogo}
                    className='bb-logo'
                />
                <h3>
                    Crypto Indices and curated portfolios aggregated across multiple chains in CEFI and DEFI
                </h3>
            </div>
            
            <div className="type-block">
                <h2>DeFi</h2>
                <h5>Choose your role</h5>
                <div className="link-wrapper">
                    <Link to={`defi/baskets`} className="finance-btn">
                        Investor
                    </Link>
                    <Link to={`defi/create`} className="finance-btn">
                        Index Creator
                    </Link>
                </div>
            </div>
            <div className="type-block">
                <h2>CeFi</h2>
                <h5>Choose your role</h5>
                <div className="link-wrapper">
                    <Link to={`cefi/baskets`} className="finance-btn">
                        Investor
                    </Link>
                    <Link to={`cefi/create`} className="finance-btn">
                        Basket Creator
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default LandingPage;
