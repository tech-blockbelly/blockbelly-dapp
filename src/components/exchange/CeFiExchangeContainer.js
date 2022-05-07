import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Image, Button } from 'react-bootstrap';

import FundsListing from '../dashboard/newcomponents/FundsListing';
import BinanceLogo from '../../assets/images/binance.png';
import bitoasisLogo from '../../assets/images/bitoasis.jpeg';

const BitoasisContainer = (props) => {
    return (
        <FundsListing type="cefi" {...props} />
    );
};

const CeFiExchangeContainer = (props) => {
    const [key, setKey] = useState('bitoasis');
    const [fundsRepo, setFundsRepo] = useState({});

    const fetchRepository = () => {
        fetch("/indexrepository.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setFundsRepo(data[0])
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchRepository()
    }, []);


    return (
        <Container fluid className="module-container">
            <h2 className="module-title">Explore Baskets</h2>
            <Container fluid className="funds-tab-container">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="funds-type-tab">
                    <Tab
                        eventKey="bitoasis"
                        title={
                            <span className="tab-title">
                                <Image className="tab-logo" src={bitoasisLogo}/>
                                BitOasis
                                {/* <div className="coming-soon-tag">
                                    <span>Coming soon!</span>
                                </div> */}
                            </span>
                        }
                        // disabled
                    >
                        {/* <Fragment /> */}
                        <BitoasisContainer funds={fundsRepo.Bitoasis} />
                    </Tab>
                    <Tab
                        eventKey="binance"
                        title={
                            <span className="tab-title">
                                <Image className="tab-logo" src={BinanceLogo} />
                                Binance
                                <div className="coming-soon-tag">
                                    <span>Coming soon!</span>
                                </div>
                            </span>
                        }
                        disabled
                    >
                        <Fragment />
                        {/* <BinanceContainer funds={fundsRepo.Binance} /> */}
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
};

export default CeFiExchangeContainer;