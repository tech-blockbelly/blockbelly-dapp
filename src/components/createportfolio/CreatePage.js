import React, { useState, useEffect } from 'react';
import PortfolioForm from './PortfolioForm';
import { Image, Container, Row, Col, ListGroup } from 'react-bootstrap';
import Select, { components } from 'react-select';
// import PortfolioPreview from './PortfolioPreview';
// import SelectCoins from './SelectCoins';
import SetAllocations from './SetAllocations';
import { getAPIClient } from '../../httpClient';
import SuccessModal from '../common/SuccessModal';
import ErrorModal from '../common/ErrorModal';
import { Redirect } from 'react-router-dom';

import ethLogo from '../../assets/images/eth.png';
import solLogo from '../../assets/images/solana.png';
import polygonLogo from '../../assets/images/polygon.png';
import nearLogo from '../../assets/images/near-protocol.svg';
import terraLogo from '../../assets/images/terraluna.png';

const chains = [
    { value: 'Ethereum', label: 'Ethereum', icon: ethLogo },
    { value: 'Solana', label: 'Solana', icon: solLogo },
    { value: 'Polygon', label: 'Polygon', icon: polygonLogo },
    { value: 'Near', label: 'Near', icon: nearLogo },
    { value: 'Terra', label: 'Terra', icon: terraLogo },
];
const exchange = [
    {
        value: 'Binance',
        label: 'Binance',
        icon: 'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg',
    },
];
const chainCoins = {
    Ethereum: [
        {
            value: 'ETH',
            label: 'Ethereum',
            icon: 'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
        },
        {
            value: 'UNI',
            label: 'Uniswap',
            icon: 'https://dynamic-assets.coinbase.com/a1f4b7b34069888e313f284b49012a01b3bbc37b5113319c7105170a8fe268de8f60be5a0af7a8dafa8aba31fcc21ef44bc30c1e8bbb8379064ac94965bccf26/asset_icons/aafc2f5fff21664213e2a5a2c6e31aa055f277d1069b16745d54f84c0e94f1f3.png',
        },
        {
            value: 'SUSHI',
            label: 'SushiSwap',
            icon: 'https://dynamic-assets.coinbase.com/cede43e837596061c7e2290c725be20ee0eb000eb76937c879289ccf08f5941f9c1d76e3f3dd8cb0e67f53d0f4adc48286516200e7db5bd6bc403fcd9d318449/asset_icons/483b36b14a995b07c7883d0647903f77d8feafe1f685b55a0334b8788b151194.png',
        },
        {
            value: 'AAVE',
            label: 'Aave',
            icon: 'https://dynamic-assets.coinbase.com/6ad513d3c9108b163cf0a4c9fd3441cadcb9cf656ea7b9fb333eb7e4a94cd503528e0a94188285d31aedfc392f0793fd4161f7ad4e04d5f6b82e4d70a314d295/asset_icons/80f3d2256652f5ccd680fc48702d130dd01f1bd7c9737fac560a02949efac3b9.png',
        },
        {
            value: 'MKR',
            label: 'Maker',
            icon: 'https://dynamic-assets.coinbase.com/72be4627a61ff07a564bc85f46f20e926b0a578ee791e91ef73eb477b5bcd176edadb63b3474f82b98e1cc83ba23b1d170a539356ed8e809937f76a13580bfad/asset_icons/debfcbc694825f71051ce956aeae3a4bb197437756d4fc5cd1a207b8ea135ab6.png',
        },
        {
            value: 'COMP',
            label: 'Compound',
            icon: 'https://dynamic-assets.coinbase.com/b0d22ef41d2fa2ecbb6c116ab9aa5f0ec6541cc63cffd922dd1f1564eda40e20e69cdafd8044c0d512e906b99dcdf0eade4251fe0ca3edd4dfa1ba2e6145cdf4/asset_icons/fed5c36d72b459ebe60c190c315bde2266ae24ff445f5cf599f124ac4fa21713.png',
        },
        {
            value: 'YFI',
            label: 'yearn.finanace',
            icon: 'https://dynamic-assets.coinbase.com/732c0e4f7694897590132ea6439900545867508aee3a95c23f3f1a1a4ba804008585c40c2c3e175c3453d0f97b7e02eb0c643c83329f0a411695e373e51a3c25/asset_icons/c1fa922390de92c17ce199e05cd51d230920934ab0fdf5d727b766ff2609e49b.png',
        },
        {
            value: 'FTM',
            label: 'Fantom',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
        },
        {
            value: 'MATIC',
            label: 'Matic',
            icon: 'https://dynamic-assets.coinbase.com/085ce26e1eba2ccb210ea85df739a0ca2ef782747e47d618c64e92b168b94512df469956de1b667d93b2aa05ce77947e7bf1b4e0c7276371aa88ef9406036166/asset_icons/57f28803aad363f419a950a5f5b99acfd4fba8b683c01b9450baab43c9fa97ea.png',
        },
        {
            value: 'REN',
            label: 'Ren',
            icon: 'https://dynamic-assets.coinbase.com/0963b0aff0245ec293c96dd16e563bddf6536b6060df232eb086a63a331840819fa07fb5a9345844cd72bccd338f1a178da9346f7d777b7042937ac71db0115a/asset_icons/34ccc76425dc3b8f56c85744c5745d587719c033e97f78f9ff0d231cd7c6f0dd.png',
        },
        { value: 'FTT', label: 'FTX Token', icon: '' },
        { value: 'LINK', label: 'ChainLink', icon: '' },
        { value: '1INCH', label: '1inch', icon: '' },
        { value: 'SAND', label: 'SandBox', icon: '' },
        { value: 'PEOPLE', label: 'Constitution DAO', icon: '' },
        { value: 'CRV', label: 'Curve', icon: '' },
    ],
    Solana: [
        { value: 'SOL', label: 'Solana', icon: solLogo },
        {
            value: 'FTT',
            label: 'FTX Token',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv/logo.png',
        },
        {
            value: 'SRM',
            label: 'Serum',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png',
        },
        {
            value: 'soHNT',
            label: 'Helium',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e/logo.png',
        },
        {
            value: 'GRT',
            label: 'Graph',
            icon: 'https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566',
        },
        {
            value: 'RAY',
            label: 'Raydium',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
        },
        {
            value: 'AUDIO',
            label: 'Audius',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM/logo.png',
        },
        {
            value: 'ATLAS',
            label: 'Star Atlas',
            icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png',
        },
    ],
    Polygon: [
        {
            value: 'AAVE',
            label: 'Aave',
            icon: 'https://dynamic-assets.coinbase.com/6ad513d3c9108b163cf0a4c9fd3441cadcb9cf656ea7b9fb333eb7e4a94cd503528e0a94188285d31aedfc392f0793fd4161f7ad4e04d5f6b82e4d70a314d295/asset_icons/80f3d2256652f5ccd680fc48702d130dd01f1bd7c9737fac560a02949efac3b9.png',
        },
        {
            value: 'COMP',
            label: 'Compound',
            icon: 'https://dynamic-assets.coinbase.com/b0d22ef41d2fa2ecbb6c116ab9aa5f0ec6541cc63cffd922dd1f1564eda40e20e69cdafd8044c0d512e906b99dcdf0eade4251fe0ca3edd4dfa1ba2e6145cdf4/asset_icons/fed5c36d72b459ebe60c190c315bde2266ae24ff445f5cf599f124ac4fa21713.png',
        },
        {
            value: 'MANA',
            label: 'Decentraland',
            icon: 'https://assets.coingecko.com/coins/images/878/thumb/decentraland-mana.png?1550108745',
        },
        {
            value: 'GRT',
            label: 'The Graph',
            icon: 'https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566',
        },
        {
            value: 'LINK',
            label: 'ChainLink',
            icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
        },
    ],
    Near: [
        {
            value: 'WETH',
            label: 'Ethereum (WETH)',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png'
        },
        {
            value: 'REF',
            label: 'Ref Finance',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11809.png',
        },
        {
            value: 'SKYWARD',
            label: 'Skyward Finance',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11798.png',
        },
        {
            value: 'AURORA',
            label: 'Aurora',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/14803.png',
        },
        {
            value: 'CELO',
            label: 'Celo',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png',
        },
        {
            value: 'Octopus',
            label: 'Octopus Protocol',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10494.png',
        },
    ],
    Terra: [
        {
            value: 'LUNA',
            label: 'Terra',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4172.png'
        },
        {
            value: 'MIR',
            label: ' Mirror Protocol',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7857.png'
        },
        {
            value: 'ANC',
            label: 'Anchor Coin Protocol',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8857.png',
        },
        {
            value: 'WHALE',
            label: 'Whale',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6679.png',
        },
        {
            value: 'TWD',
            label: 'Terra World Token',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/13886.png',
        }
    ],
    Binance: [
        { value: 'ETH', label: 'Ethereum', icon: ethLogo },
        { value: 'SOL', label: 'Solana', icon: solLogo },
        { value: 'NEAR', label: 'Near Protocol', icon: nearLogo },
        {
            value: 'HNT',
            label: 'Helium Token',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5665.png',
        },
        {
            value: 'GRT',
            label: 'The Graph',
            icon: 'https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566',
        },
        {
            value: 'RUNE',
            label: 'Rune',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9905.png',
        },
        {
            value: 'AR',
            label: 'Arweave',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5632.png',
        },
        {
            value: 'AUDIO',
            label: 'Audius',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7455.png',
        },
        {
            value: 'LPT',
            label: 'Livepeer ',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3640.png',
        },
    ],
};

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="coin-info">
                <Image
                    src={props.data.icon}
                    className="coin-logo"
                    style={{ width: 36, marginRight: 10 }}
                />
                {props.data.label}
            </div>
        </components.Option>
    );
};

const SingleValue = (props) => {
    return (
        <components.SingleValue {...props}>
            <img
                src={props.data.icon}
                alt={props.data.label + ' icon'}
                className="coin-logo"
                style={{ width: 36, marginRight: 10 }}
            />
            {props.data.label}
        </components.SingleValue>
    );
};

const CreatePage = () => {
    const [appState, setAppState] = useState({
        loading: true,
        // coins: [],
    });

    const [coins, setCoins] = useState([]);
    const [defaultCoinValue, setDefaultCoinValue] = useState('');

    const onChainSelect = (chain) => {
        let selectedChain = chain.value;
        setCoins(chainCoins[selectedChain]);
        setSelectedCoins({});
        setDefaultCoinValue('');
    };

    /** Temporarily disabled  */
    // useEffect(() => {
    //     setAppState({ ...appState, loading: true });
    //     getAPIClient()
    //         .get('portfolio/coins/')
    //         .then((res) => {
    //             const allCoins = res.data || COINS;
    //             setAppState({
    //                 ...appState,
    //                 loading: false,
    //                 coins: allCoins.map(({ sym, name, icon }) => ({
    //                     value: sym,
    //                     label: name,
    //                     image: icon,
    //                 })),
    //             });
    //         });
    // }, [setAppState]);

    const [selectedCoins, setSelectedCoins] = useState({});

    const onCoinSelect = (coin) => {
        const defaultAllocation = parseInt(
            100 / (Object.keys(selectedCoins).length + 1),
            10,
        );
        selectedCoins[coin.value] = defaultAllocation;
        setSelectedCoins(Object.assign({}, selectedCoins));
    };

    const removeCoinFromSelection = (coin) => {
        delete selectedCoins[coin];
        setSelectedCoins(Object.assign({}, selectedCoins));
    };

    const changeCoinDistribution = (sym, value) => {
        selectedCoins[sym] = parseFloat(value, 10);
        setSelectedCoins(Object.assign({}, selectedCoins));
    };

    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        min_invest: '',
        image: null,
    });

    const { name, desc, min_invest, image } = formData;

    const onFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [basketId, setBasketId] = useState(null);
    const [viewbasket, setViewbasket] = useState(null);

    // const handleShow = () => setModalShow(true);
    // const handleSipShow = () => setSipModalShow(true);

    const createBasket = (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name,
            desc,
            min_invest,
            coins: selectedCoins,
        });

        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('name', name);
        form_data.append('desc', desc);
        form_data.append('min_invest', min_invest);
        form_data.append('coins', JSON.stringify(selectedCoins));

        getAPIClient()
            .post(`portfolio/create/`, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const { id: basketId } = res.data;
                setBasketId(basketId);
                setShowSuccess(true);
                setShowError(false);
            })
            .catch((e) => {
                setShowSuccess(false);
                setShowError(true);
            });
    };

    if (viewbasket) {
        return <Redirect to={{ pathname: `/baskets/${basketId}` }} />;
    }

    return (
        <Container fluid className="module-container create-index-container">
            <Row className="header-row">
                <Col lg={6} sm={12}>
                    <h2 className="module-title">Create DeFi Index</h2>
                </Col>
                <Col lg={6} sm={12}>
                    <Row className="chain-selector-wrapper">
                        <Col lg={5} sm={12}>
                            <h4 className="container-title">Select Chain</h4>
                        </Col>
                        <Col lg={7} sm={12}>
                            <Select
                                className="chain-selector"
                                onChange={onChainSelect}
                                // options={exchange}
                                options={chains}
                                components={{ Option, SingleValue }}
                                // isClearable
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        border: 'none',
                                        borderRadius: '30px',
                                        padding: '15px',
                                        width: '100%',
                                        '&:active, &:focus, &:hover': {
                                            border: 'none',
                                        },
                                    }),
                                    options: (styles) => ({
                                        ...styles,
                                        fontSize: '16px',
                                    }),
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={6} sm={12}>
                    <PortfolioForm
                        name={name}
                        desc={desc}
                        min_invest={min_invest}
                        // coins={appState.coins}
                        coins={coins}
                        onFormChange={onFormChange}
                        handleImageChange={handleImageChange}
                    />
                </Col>
                <Col lg={6} sm={12}>
                    <SetAllocations
                        // coins={appState.coins}
                        coins={coins}
                        onCoinSelect={onCoinSelect}
                        selectedCoins={selectedCoins}
                        removeCoinFromSelection={removeCoinFromSelection}
                        changeCoinDistribution={changeCoinDistribution}
                        className={`${selectedCoins.length ? '' : ''}`}
                        defaultValue={defaultCoinValue}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={5} sm={12}>
                    <ListGroup className="fund-action-list-group">
                        <ListGroup.Item
                            action
                            onClick={createBasket}
                            className="fund-action-container accent"
                            eventKey="buy">
                            Create
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={(e) => {
                                window.location.href = '/baskets';
                            }}
                            className="fund-action-container"
                            eventKey="stake">
                            Cancel
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            {/* <SuccessModal msg="Basket Created Successfully" /> */}
            <SuccessModal
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
                action={() => {
                    setShowSuccess(false);
                    setViewbasket(true);
                }}
                actionText="View"
                msg="Basket Created Successfully"
            />
            <ErrorModal
                show={showError}
                onHide={() => setShowError(false)}
                msg="Basket Creation Failed"
                action={() => {
                    setShowError(false);
                    setViewbasket(false);
                }}
                actionText="Close"
            />
        </Container>
    );
};

export default CreatePage;
