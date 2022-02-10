import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../../actions/auth';
import queryString from 'query-string';
import { Row, Col, Container } from 'react-bootstrap';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);

    return (
			<Container className="page-container">
        <Row className="authentication-container">
            <Col md={8} className="authentication-block">
                <h2 className="auth-title">Click below to authenticate and login</h2>
                <Link className="btn btn-primary" to="/login" role="button">
                    Login
                </Link>
            </Col>
        </Row>
			</Container>
    );
};

export default connect(null, { googleAuthenticate })(Google);
