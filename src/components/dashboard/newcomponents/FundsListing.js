import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    ListGroup,
    Spinner,
  } from "react-bootstrap";
import FundInfoCard from "./FundInfoCard";
import { Redirect } from "react-router-dom";
import { ethers } from "ethers";
import Broker from "../../../abi/contracts/broker/UniswapBroker.sol/BlockbellyUniswapBroker.json";

//dummy data to be removed later
const Indices = [
    {
      name: "BTC 2x Flexible Leverage Index",
      market_cap: 1200,
      desc: "The Bitcoin Flexible Leverage Index lets you leverage a collateralized debt position in a safe and efficient way, by abstracting its management into a simple index.",
      image: "https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg",
      link: "btcfli",
      creator: "DeFi Pulse",
      creator_icon: "https://set-core.s3.amazonaws.com/img/social_traders/defi_pulse.png",
      allocations: {
          CWBTC: '98.13%',
          USDC: '1.87%',
      }
    },
    {
      name: "Metaverse Index",
      market_cap: 1000,
      desc: "The Metaverse Index is designed to capture the trend of entertainment, sports and business shifting to a virtual environment.",
      image: "https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg",
      link: "metaverse-index",
      creator: "Meta Portal",
      creator_icon: "https://set-core.s3.amazonaws.com/img/social_traders/MetaPortal.png",
      allocations: {
          ILV: '19.13%',
          SAND: '29.89%',
          Axie: '26.41%',
          Rally: '24.57%',
      }
    },
    {
      name: "Bankless BED Index",
      market_cap: 1800,
      desc: "Bankless proposed that the Index Coop manage a Set based on an index of Crypto’s most investable assets, BTC, ETH, and DPI, in equal weight.",
      image: "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/bankless_bed.png",
      link: "bankless-bed-index",
      creator: "Bankless HQ",
      creator_icon: "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/managers/bankless_logo.jpeg",
      allocations: {
          BTC: '19.13%',
          ETH: '29.89%',
          DPI: '46.41%',
      }
    },
];

const FundsListing = (props) => {
    const [appState, setAppState] = useState({
        loading: true,
        funds: [],
        type: "all",
    });

    const [showPage, setShowPage] = useState(false);
    const [eventKey, setEventKey] = useState(null);

    const fetchIndices = async () => {
        let contractAddress = "0x010beF225D0DEAF8fB429726198ff997485f9b0d";
        const { ethereum } = window;
    
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Broker.abi, provider);
    
        const indices = await contract.getIndices();
        return indices;
    };

    useEffect(() => {
        setAppState({ ...appState, loading: true });
        if (!props.toLedger) {
          fetchIndices().then((res) => {
            const funds = res.map(index => ({
              name: index["name"],
              symbol: index["symbol"],
              cgId: index["cgId"],
              tkOutAddr: index["tkOutAddr"],
              tkInAddr: index["tkInAddr"],
              poolFee: index["poolFee"],
              prOracleAddr: index["prOracleAddr"],
              invOraclePrice: index["invOraclePrice"],
            }))
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
    }, [appState.type, props]);

    const onFundSelect = (eventKey) => {
        setEventKey(eventKey);
        setShowPage(true);
    };

    if (showPage) {
        // if (props.toLedger) {
        //     return <Redirect to={{ pathname: `/ledger/${eventKey}` }} />;
        // }
        return <Redirect to={{ pathname: `/baskets/${eventKey}` }} />;
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
                    {Indices.length ? (
                        <Row>
                            {Indices.map((portfolio, index) => {
                                return (
                                    <Col m={3} >
                                        <FundInfoCard 
                                            {...props}
                                            fund={portfolio}
                                            // eventKey={portfolio.link}
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
    )

}

export default FundsListing;