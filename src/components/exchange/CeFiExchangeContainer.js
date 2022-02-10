import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoWallet } from 'react-icons/io5';
import { connect } from 'react-redux';
import PortfolioModule from '../dashboard/PortfolioModule';

const CeFiExchangeContainer = (props) => {
    const { canTrade } = props;
    return canTrade ? (
        <PortfolioModule type="cefi" title="Explore Baskets" />
    ) : (
        <Container className="component-container defi-exchange-page">
            <Row>
                <Col>
                    <Button className="connect-btn">
                        <IoWallet /> <span>Connect to Binance Account</span>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    canTrade: state.auth.canTrade,
});

export default connect(mapStateToProps)(CeFiExchangeContainer);
