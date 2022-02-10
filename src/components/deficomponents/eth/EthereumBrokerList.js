import React, { useEffect, useState } from 'react';
import { getAPIClient } from '../../httpClient';
import {
    Container,
    Tabs,
    Tab,
    Nav,
    Row,
    Col,
    ListGroup,
    Button,
    Spinner,
} from 'react-bootstrap';
import FundsInfoCard from './FundInfoCard';
import { FaSort } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { useContractFunction } from '@usedapp/core';
import { ethers } from 'ethers';
import Broker from '../../abi/contracts/broker/UniswapBroker.sol/BlockbellyUniswapBroker.json';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';

// import { connect } from 'react-redux';

const TABS = [
    { eventKey: 'all', title: 'Ethereum' },
    { eventKey: 'popular', title: 'Solana' },
    { eventKey: 'trending', title: 'Polygon' },
    { eventKey: 'other', title: 'Avalance' },
];

const FUNDS = [
    {
        name: 'Famous 10 Large Caps',
        min_invest: 1000,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut elit ligula. Aenean ullamcorper, lorem a lobortis viverra, dui odio pulvinar mauris, vitae rutrum felis nunc et diam.',
        image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
        num_investors: '123',
        cagr: 13.3,
        link: '/famous-large-caps',
        creator: 'Streetgains Research',
        num_responses: '112',
    },
    {
        name: 'The Middlemen Mid Caps',
        min_invest: 9800,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut elit ligula. Aenean ullamcorper, lorem a lobortis viverra, dui odio pulvinar mauris, vitae rutrum felis nunc et diam.',
        image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
        num_investors: '2231',
        cagr: 9.13,
        link: '/mid-caps',
        creator: 'Streetgains Research',
        num_responses: '222',
    },
    {
        name: 'Gem Seeker Small Caps',
        min_invest: 10000,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut elit ligula. Aenean ullamcorper, lorem a lobortis viverra, dui odio pulvinar mauris, vitae rutrum felis nunc et diam.',
        image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
        num_investors: '523',
        cagr: 16.11,
        link: '/small-caps',
        creator: 'Windmill Capital',
        num_responses: '312',
    },
    {
        name: 'NFT focused',
        min_invest: 2500,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut elit ligula. Aenean ullamcorper, lorem a lobortis viverra, dui odio pulvinar mauris, vitae rutrum felis nunc et diam.',
        image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
        num_investors: '1346',
        cagr: -2.3,
        link: '/nft-focused',
        creator: 'Windmill Capital',
        num_responses: '192',
    },
];

const EthereumBrokerList = (props) => {
    const [appState, setAppState] = useState({
        loading: true,
        funds: [],
    });

    const [showPage, setShowPage] = useState(false);
    const [eventKey, setEventKey] = useState(null);
    const [goTolinkExchange, setGoTolinkExchange] = useState(false);

    // const brokerInterface = new utils.Interface(Broker.abi);
    // const brokerContractAddress = props.brokerAddress;
    // const contract = new Contract(brokerContractAddress, brokerInterface);

    // const Componentbroker = {
    //     brokerInterface,
    //     brokerContractAddress,
    //     contract,
    // };

    const fetchIndices = async () => {
        const contractAddress = props.brokerAddress;
        const { ethereum } = window;

        if (!ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
            contractAddress,
            Broker.abi,
            provider,
        );

        const indices = await contract.getIndices();
        return indices;
    };

    // const { state, send: getIndices } = useContractFunction(
    //     ComponentRegistry,
    //     'getIndices',
    //     {
    //         transactionName: 'Indices',
    //     },
    // );

    const idFieldKey = props.toLedger ? 'ledger_id' : 'id';
    // const endpoint = type == 'cefi' ? 'portfolio' : 'indices';
    useEffect(() => {
        setAppState({ ...appState, loading: true });
        if (!props.toLedger) {
            fetchIndices().then((res) => {
                console.log(res[0]['name']);
                const funds = res.map((index) => ({
                    name: index['name'],
                    symbol: index['symbol'],
                    cgId: index['cgId'],
                    tkOutAddr: index['tkOutAddr'],
                    tkInAddr: index['tkInAddr'],
                    poolFee: index['poolFee'],
                    prOracleAddr: index['prOracleAddr'],
                    invOraclePrice: index['invOraclePrice'],
                }));
                // const allFunds = res.data;
                setAppState({
                    ...appState,
                    loading: false,
                    funds: funds,
                });
            });
        } else {
            setAppState({
                ...appState,
                loading: false,
                funds: props.funds || [],
            });
        }
    }, [props]);

    const onSelect = (eventKey, e) => {
        e.preventDefault();
        setAppState({ ...appState, type: eventKey });
    };

    const onFundSelect = (eventKey) => {
        setEventKey(eventKey);
        setShowPage(true);
    };

    const linkExchange = (e) => {
        e.preventDefault();
        setGoTolinkExchange(true);
    };

    if (goTolinkExchange) {
        return <Redirect to={{ pathname: `/baskets` }} />;
    }

    if (showPage) {
        console.log(`basket/${eventKey}`);
        if (props.toLedger) {
            return <Redirect to={{ pathname: `/ledger/${eventKey}` }} />;
        }
        return <Redirect to={{ pathname: `/basket/${eventKey}` }} />;
    }

    return (
        <Container fluid className="funds-tab-container">
            {/* {props.toLedger ? null : (
                <Row>
                    <Tabs
                        defaultActiveKey={appState.type}
                        id="funds-tab"
                        className="funds-type-tab"
                        onSelect={onSelect}>
                        {TABS.map(({ eventKey, title }) => (
                            <Tab eventKey={eventKey} title={title} />
                        ))}
                    </Tabs>
                </Row>
            )} */}
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
                        <ListGroup className="funds-list-group">
                            <ListGroup.Item className="sort-button-container">
                                <Row>
                                    <Col xl={3}></Col>
                                    <Col xl={2} className="text-center">
                                        <a size="sm">
                                            AUM
                                            <FaSort />
                                        </a>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <a>
                                            {props.toLedger
                                                ? 'Amt. Invested'
                                                : 'Min. Amount'}
                                            <FaSort />
                                        </a>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <a size="sm">
                                            CAGR
                                            <FaSort />
                                        </a>
                                    </Col>
                                    <Col xl={1} className="text-center">
                                        <a size="sm">
                                            Investors
                                            <FaSort />
                                        </a>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <a size="sm">
                                            Rating
                                            <FaSort />
                                        </a>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {appState.funds.map((portfolio, index) => {
                                return (
                                    <FundsInfoCard
                                        {...props}
                                        fund={portfolio}
                                        eventKey={portfolio[idFieldKey]}
                                        onFundSelect={onFundSelect}
                                    />
                                );
                            })}
                        </ListGroup>
                    ) : props.toLedger ? (
                        <ListGroup className="funds-list-group">
                            <ListGroup.Item className="no-funds-container">
                                {/* <div
                            className="no-selection text-center"
                            style={{ padding: '40px' }}>
                            <p>No Data</p>
                        </div> */}
                                <h3>Start investing</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className="sort-button-container">
                                <div className="no-selection text-center">
                                    <Button
                                        className="btn m-auto"
                                        onClick={linkExchange}>
                                        Explore Funds
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
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
        // <Tabs
        //     defaultActiveKey="popular"
        //     id="funds-tab"
        //     className="funds-type-tab">
        //     {info.map((element, index) => (
        //         <Tab eventKey={element.id} title={element.title}>
        //             {/* <Row className="heading-row">
        //                 <Col md={4}>
        //                     <h4>Fund Name</h4>
        //                 </Col>
        //                 <Col md={2}>
        //                     <h4>Investors</h4>
        //                 </Col>
        //                 <Col md={2}>
        //                     <h4>Returns</h4>
        //                 </Col>
        //                 <Col md={3}>
        //                     <h4>Creator</h4>
        //                 </Col>
        //                 <Col md={1}>
        //                     <h4>Likes</h4>
        //                 </Col>
        //             </Row> */}
        //             {index === 0
        //                 ? funds.map((portfolio, index) => {
        //                       portfolio.image =
        //                           element.funds[index].image;
        //                       portfolio.returns = `${
        //                           portfolio.cagr > 0 ? '+' : '-'
        //                       }${portfolio.cagr}%`;
        //                     //   poportfolio.num_investors;
        //                     //   portfolio.num_responses;
        //                       return <FundsInfoCard fund={portfolio} toLedger={toLedger} />;
        //                   })
        //                 : element.funds.map((portfolio, index) => {
        //                       return <FundsInfoCard fund={portfolio} toLedger={toLedger} />;
        //                   })}
        //         </Tab>
        //     ))}
        // </Tabs>
    );
};

export default EthereumBrokerList;
