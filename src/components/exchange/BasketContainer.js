import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import DeFiExchangeContainer from './DeFiExchangeContainer';
import CeFiExchangeContainer from './CeFiExchangeContainer';

const BasketListContainer = () => {
    let { type } = useParams();

    const getContainer = () => {
        if (type === 'defi') {
            return <DeFiExchangeContainer />;
        } else if (type === 'cefi') {
            return <CeFiExchangeContainer />;
        } else {
            return (
                <Container className="component-container defi-exchange-page">
                    <Row>
                        <Col>404 Page Not Found.</Col>
                    </Row>
                </Container>
            );
        }
    };
    return getContainer();
};

export default BasketListContainer;
