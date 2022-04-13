import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import FundInfoCard from './FundInfoCard';
import { Redirect } from 'react-router-dom';
import { ethers } from 'ethers';
import Broker from '../../../abi/contracts/broker/UniswapBroker.sol/BlockbellyUniswapBroker.json';

const FundsListing = (props) => {
    let type = props.type;
    const [appState, setAppState] = useState({
        loading: true,
        funds: props.funds,
        type: 'all',
    });

    const [showPage, setShowPage] = useState(false);
    const [eventKey, setEventKey] = useState(null);
    const [eventId, setEventId] = useState(null);

    const fetchIndices = async () => {
        let contractAddress = '0x010beF225D0DEAF8fB429726198ff997485f9b0d';
        const { ethereum } = window;

        if (!ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            Broker.abi,
            provider,
        );

        const indices = await contract.getIndices();
        return indices;
    };

    useEffect(() => {
        setAppState({ ...appState, loading: true });
        // if (!props.toLedger) {
        //     fetchIndices().then((res) => {
        //         const funds = res.map((index) => ({
        //             name: index['name'],
        //             symbol: index['symbol'],
        //             cgId: index['cgId'],
        //             tkOutAddr: index['tkOutAddr'],
        //             tkInAddr: index['tkInAddr'],
        //             poolFee: index['poolFee'],
        //             prOracleAddr: index['prOracleAddr'],
        //             invOraclePrice: index['invOraclePrice'],
        //         }));
        //         // const allFunds = res.data;
        //         setAppState({
        //             ...appState,
        //             loading: false,
        //             funds: funds,
        //         });
        //     });
        // } else {
            setAppState({
                ...appState,
                loading: false,
                funds: props.funds || [],
            });
        // }
    }, [appState.type, props]);

    const onFundSelect = (eventId) => {
        const index = appState.funds[eventId];

        setEventKey(index['chn']);
        setEventId(eventId);
        setShowPage(true);
    };

    if (showPage) {
        return (
            // <Redirect to={{ pathname: `/baskets/${eventKey}?i=${eventId}` }} />
            <Redirect to={{ pathname: `/${type}/baskets/${eventKey}/${eventId}` }} />
        );
    }

    return (
        <Container fluid className="funds-tab-container">
            {appState.loading ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <div>
                    {appState.funds.length ? (
                        <Row className="funds-listing-row">
                            {appState.funds.map((portfolio, index) => {
                                return (
                                    <Col md={4} className="funds-listing-col">
                                        <FundInfoCard
                                            {...props}
                                            fund={portfolio}
                                            eventKey={index}
                                            onFundSelect={onFundSelect}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : (
                        <ListGroup className="funds-list-group">
                            <ListGroup.Item className="fund-info-container">
                                <div
                                    className="no-selection text-center"
                                    style={{ padding: '40px' }}>
                                    <p>No Data</p>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </div>
            )}
        </Container>
    );
};

export default FundsListing;
