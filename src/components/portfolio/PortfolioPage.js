import React, { Fragment, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Spinner,
    Image,
    ListGroup,
    Form,
    ListGroupItem,
} from 'react-bootstrap';
import { IoChevronBack, IoBagCheck, IoCalendar } from 'react-icons/io5';
import DistributionTable from './DistributionTable';
import PortfolioFinancials from './PortfolioFinancials';
import axios from 'axios';
import { ChainId, DAppProvider } from '@usedapp/core';
import { IoWallet } from 'react-icons/io5';

import evmuLogo from '../../assets/images/indexLogos/EVMU.png';
import makerLogo from '../../assets/images/indexLogos/BB.png';
import soluLogo from '../../assets/images/indexLogos/SOLU.png';
import polygonLogo from '../../assets/images/indexLogos/POL.png';
import nearLogo from '../../assets/images/near-protocol.svg';

import evmPdf from '../../assets/pdfs/EVM.pdf';
import necoPdf from '../../assets/pdfs/NECO.pdf';
import polyPdf from '../../assets/pdfs/Poly.pdf';
import soluPdf from '../../assets/pdfs/SOLU.pdf';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
        [ChainId.Rinkeby]:
            'https://rinkeby.infura.io/v3/d7d8279a49d6443cb30249eab2cdb5e6',
    },
};

const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
const PortfolioPage = (props) => {
    let { i } = useQuery();
    let { chn, id } = useParams();
    const history = useHistory();
    const [hasPdf, setHasPdf] = useState(false);

    const [appState, setAppState] = useState({
        loading: true,
        // loading: false,
        fund: {},
    });

    const { activateBrowserWallet, account } = useEthers();

    useEffect(() => {
        setAppState({ ...appState, loading: true });
        axios
            // .get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .get(" http://localhost:3000/indexrepository.json")
            .then((res) => {
                let data = res.data[0]
                let index = data[capitalizeFirstLetter(chn)][id];

                // setAppState({ ...appState, loading: false, fund: res.data });
                setAppState({ ...appState, loading: false, fund: index });
            })
            .catch((err) => console.log(err));
    }, [id]);
    // }, [id, i, props]);

    if(!appState.fund.creatorIcon) {
        appState.fund.creatorIcon = makerLogo;
    }
    if (!appState.fund.icon) {
        if (appState.fund.chn == "ethereum") {
            appState.fund.icon = evmuLogo;
            appState.fund.pdfLink = evmPdf;
            setHasPdf(true);
        }
        if (appState.fund.chn == "solana") {
            appState.fund.icon = soluLogo;
            appState.fund.pdfLink = soluPdf;
            setHasPdf(true);
        }
        if (appState.fund.chn == "near") {
            appState.fund.icon = nearLogo;
            appState.fund.pdfLink = necoPdf;
            setHasPdf(true);
        }
        if (appState.fund.chn == "polygon") {
            appState.fund.icon = polygonLogo;
            appState.fund.pdfLink = polyPdf;
            setHasPdf(true);
        }
    }

    let buyBtnText = (appState.fund.chn === "ethereum") ? 'Buy' : 'Mint'

    return (
        <Container fluid className="module-container portfolio-page-container">
            <a onClick={history.goBack}>
                <h2 className="module-title">
                    <IoChevronBack /> Explore
                </h2>
            </a>
            {appState.loading && appState.fund ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <Row>
                    <Col xl={7} className="information-column">
                        <Row className="title-info-row">
                            <Image
                                // src={appState.fund['image']['large']}
                                src={appState.fund['icon']}
                                roundedCircle
                                className="icon"
                            />
                            <div className="title-block">
                                <h2>{appState.fund['iName']}</h2>
                                <h5>{appState.fund['iSym']}</h5>
                            </div>
                        </Row>
                        <Row className="general-info-row">
                            <Col className="creator-info-column" xl={4}>
                                <Image
                                    className="creator-icon"
                                    // src="https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/managers/bankless_logo.jpeg"
                                    src={appState.fund['creatorIcon']}
                                    roundedCircle
                                />
                                <div>
                                    <p className="creator-name">{appState.fund['creator']}</p>
                                    <p className="subtext">Creator</p>
                                </div>
                            </Col>
                            <Col className="market-info-column" xl={4}>
                                <p className="market-cap">
                                    $
                                    {
                                        // appState.fund['market_data'][
                                        //     'market_cap'
                                        // ]['usd']
                                        2221
                                    }
                                </p>
                                <p className="subtext">Market Cap</p>
                            </Col>
                        </Row>
                        <Row className="information-row">
                            {/* <PortfolioFinancials 
                                fund={appState.fund}
                                endpoint={""}
                                type={"defi"}
                            /> */}
                            <h4 className="title">Allocations</h4>
                            <DistributionTable
                                {...props}
                                tokens={appState.fund['iCmp']}
                            />
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Overview</h4>
                            <div className="information-text">
                                {/* {appState.fund['description']['en']} */}
                                {appState.fund['iDesc']}
                            </div>
                        </Row>
                        <Row className="information-row">
                            <h4 className="title">Methodology</h4>
                            <div className="information-text" dangerouslySetInnerHTML={{__html:appState.fund['iMethodology']}}>
                            </div>
                        </Row>
                        {/* pdf code fails on non-BB indices. Needs to be rechecked */}
                        {/* {
                            hasPdf ? (
                                <Row className="information-row">
                                    <div className="information-text">
                                        Click to view detailed <a href = {appState.fund.pdfLink} target='_blank' className='pdf-link'>factsheet</a>
                                    </div>
                                </Row>
                            ) : {}
                        } */}
                    </Col>
                    <Col xl={5} className="transaction-column">
                        <div className="fixed-column">
                        <Row>
                            <Col className="portfolio-info-container defi-buy">
                                <ListGroup className="fund-action-list-group">
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="pay-with-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Pay With
                                            </Form.Label>
                                            <Form.Control
                                                className="pay-with-input form-input"
                                                type="text"
                                                placeholder="0.000000 SOL"
                                                name="paymentIndex"
                                                required
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ border: '0' }}>
                                        <Form.Group controlId="buy-input">
                                            <Form.Label
                                                style={{
                                                    'font-size': 'larger',
                                                }}>
                                                Bid
                                            </Form.Label>
                                            <Form.Control
                                                className="buy-input form-input"
                                                type="text"
                                                placeholder="0.000000 SOLU"
                                                name="buyIndex"
                                                readOnly
                                            />
                                        </Form.Group>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup
                                    flush
                                    className="transaction-breakup-block">
                                    <ListGroupItem>
                                        Minimum Receive
                                        <p>0.00000</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Network Fee
                                        <p>0.000 SOL</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Platform Fee
                                        <p>0.000 SOL</p>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <ListGroup className="fund-action-list-group">
                            {account ? (
                                <Fragment>
                                    <ListGroup.Item
                                        action
                                        // onClick={(e) => {
                                        //     e.preventDefault();
                                        //     window.location.href = `/invest/${id}`;
                                        // }}
                                        // onClick={handleShow}
                                        className="fund-action-container accent"
                                        eventKey="buy">
                                        <IoBagCheck /> {buyBtnText}
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        action
                                        // onClick={handleSipShow}
                                        className="fund-action-container"
                                        eventKey="stake">
                                        <IoCalendar /> Recurring Invest
                                    </ListGroup.Item>
                                </Fragment>
                            ) : (
                                <ListGroup.Item
                                    action
                                    className="fund-action-container accent"
                                    onClick={() => activateBrowserWallet()}>
                                    <IoWallet />{' '}
                                    <span>Connect to Metamask Wallet</span>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

const PortfolioContainer = (props) => {
    return (
        <DAppProvider config={config}>
            <PortfolioPage {...props} />
        </DAppProvider>
    );
};

export default PortfolioContainer;
