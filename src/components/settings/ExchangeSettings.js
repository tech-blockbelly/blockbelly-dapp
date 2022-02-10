import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoCloseSharp, IoPencilSharp } from 'react-icons/io5';
import { getAPIClient } from '../../httpClient';

const ExchangeSettings = () => {
    const [appState, setAppState] = useState({
        loading: true,
        keys: [],
    });

    useEffect(() => {
        getAPIClient()
            .get(`profile/linked-exchanges/`)
            .then((res) => {
                const keys = res.data;
                setAppState({ loading: false, keys: keys || [] });
            });
    }, [setAppState]);

    return (
        <Container className="exchange-settings-container">
            <Row className="heading-row">
                <Col md={8}>
                    <h2>Exchange Details</h2>
                </Col>
                <Col md={4}>
                    <Link to="/exchange" className="add-btn btn">
                        Add Exchange
                    </Link>
                </Col>
            </Row>
            <Row className="table-row">
                <Table responsive borderless>
                    <thead>
                        <tr>
                            <th>
                                <h5>Exchange</h5>
                            </th>
                            <th>
                                <h5>API Key</h5>
                            </th>
                            <th>
                                <h5>Action</h5>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appState.keys.map((key) => (
                            <tr>
                                <td className="">key.exchange</td>
                                <td className="">key.api_key</td>
                                <td className="action-btn-wrapper">
                                    <Button className="edit-btn">
                                        <IoPencilSharp />
                                    </Button>
                                    <Button className="delete-btn">
                                        <IoCloseSharp />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default ExchangeSettings;
