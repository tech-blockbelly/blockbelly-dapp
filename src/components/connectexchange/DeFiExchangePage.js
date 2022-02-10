import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoWallet } from 'react-icons/io5';

const DeFiExchangePage = () => {
    return (
        <Container className="component-container defi-exchange-page">
            <Row>
                <Col>
                    <Button className="connect-btn">
											<IoWallet /> <span>Connect to DeFi Wallet</span>
										</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default DeFiExchangePage;
