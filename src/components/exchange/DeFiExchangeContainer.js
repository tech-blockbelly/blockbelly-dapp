import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { IoWallet } from 'react-icons/io5';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Registry from '../../abi/contracts/BlockbellyRegistry.sol/BlockbellyComponentRegistry.json';
import EthereumBrokerList from '../deficomponents/eth/EthereumBrokerList';

// import FundsModule from '../dashboard/FundsModule';
import FundsListing from '../dashboard/newcomponents/FundsListing';

require('@solana/wallet-adapter-react-ui/styles.css');

const config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
        [ChainId.Rinkeby]: '',
    },
};

const network = WalletAdapterNetwork.Devnet;

const EthereumContainer = (props) => {
    const [showPage, setShowPage] = useState(false);
    const [brokerAddress, setBrokerAddress] = useState('');

    const { activateBrowserWallet, account } = useEthers();
    const getBrokerAddress = async () => {
        const contractAddress = '0xC61f29A6FdB5310E8B4fb9Ab1C2043c4f88cED29';
        const { ethereum } = window;

        if (!ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
            contractAddress,
            Registry.abi,
            provider,
        );

        const brokerDetails = await contract.getComponentDetails('broker');
        return brokerDetails['contractAddress'];
    };

    useEffect(async () => {
        getBrokerAddress()
            .then((address) => {
                if (!address) {
                    throw new Error('Broker address not found');
                }
                setBrokerAddress(brokerAddress);
                setShowPage(true);
            })
            .catch((err) => {
                setShowPage(false);
            });
    }, [props]);

    return account && showPage ? (
        <Fragment>
            <EthereumBrokerList
                brokerAddress={brokerAddress}
                title="Explore Indices"
            />
        </Fragment>
    ) : (
        <Container className="component-container defi-exchange-page">
            <Row>
                <Col>
                    <Button
                        className="connect-btn"
                        onClick={() => activateBrowserWallet()}>
                        <IoWallet /> <span>Connect to Metamask Wallet</span>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

const SolanaContainer = () => {
    const wallet = useWallet();

    wallet.select('Phantom');
    // return wallet.connected ? 
    return (
        // <FundsModule type="defi" title="Explore Indices" />
        <FundsListing />
    ) 
    // : (
    //     <Container className="component-container defi-exchange-page">
    //         <Row>
    //             <Col>
    //                 <Button
    //                     className="connect-btn"
    //                     onClick={() => wallet.connect()}>
    //                     <IoWallet /> <span>Connect to Phantom Wallet</span>
    //                 </Button>
    //             </Col>
    //         </Row>
    //     </Container>
    // );
};

const DeFiExchangeContainer = () => {
    // const [key, setKey] = useState('ethereum');
    const [key, setKey] = useState('solana');

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [getPhantomWallet()], [network]);
    return (
        <Container fluid className="module-container">
            <h2 className="module-title">Explore Indices</h2>
            <Container fluid className="funds-tab-container">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="funds-type-tab">
                    {/* <Tab eventKey="ethereum" title="Ethereum">
                        <DAppProvider config={config}>
                            <EthereumContainer />
                        </DAppProvider>
                    </Tab> */}
                    <Tab eventKey="solana" title="Solana">
                        <ConnectionProvider endpoint={endpoint}>
                            <WalletProvider wallets={wallets}>
                                <WalletModalProvider>
                                    <SolanaContainer />
                                </WalletModalProvider>
                            </WalletProvider>
                        </ConnectionProvider>
                    </Tab>
                    <Tab eventKey="avalance" title="Avalanche" disabled>
                        <Fragment />
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
};

export default DeFiExchangeContainer;
