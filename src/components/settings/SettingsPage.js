import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserSettings from './UserSettings';
import ExchangeSettings from './ExchangeSettings';

import { getAPIClient } from '../../httpClient';
import { connect } from 'react-redux';

const SettingsPage = ({ user }) => {
    const [appState, setAppState] = useState({
        loading: true,
        user: {},
        exchanges: [],
    });

    useEffect(() => {
        getAPIClient()
            .get(`profile/${user.id}/`)
            .then((res) => {
                const userDetals = res.data;
                appState.user = userDetals || user;
                setAppState({ loading: false, ...appState });
                console.log(res.data);
            });
    }, [setAppState, user]);

    useEffect(() => {
        getAPIClient()
            .get(`profile/linked-exchanges/`)
            .then((res) => {
                const exchanges = res.data;
                appState.exchanges = exchanges || [];
                setAppState({ loading: false, ...appState });
                console.log(res.data);
            });
    }, [setAppState, user]);

    return (
        <Container fluid className="module-container settings-page">
            <Row>
                <Col md={12}>
                    <ExchangeSettings
                        exchanges={appState.exchanges}></ExchangeSettings>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(SettingsPage);
