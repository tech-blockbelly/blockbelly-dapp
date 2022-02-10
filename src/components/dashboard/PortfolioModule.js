import React from 'react';
import FundsModule from './FundsModule';
import { Container, Row } from 'react-bootstrap';
import { Fragment } from 'react';

const PortfolioModule = (props) => {
    return (
        // <Row className="component-container">
        <Container fluid className="module-container">
            <h2 className="module-title">{props.title}</h2>
            <FundsModule {...props} />
        </Container>
        // </Row>
    );
};

export default PortfolioModule;
