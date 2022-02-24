import React, { useState, useEffect } from 'react';
import PortfolioForm from './PortfolioForm';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Select, { components } from 'react-select';
// import PortfolioPreview from './PortfolioPreview';
// import SelectCoins from './SelectCoins';
import SetAllocations from './SetAllocations';
import { getAPIClient } from '../../httpClient';
import SuccessModal from '../common/SuccessModal';
import ErrorModal from '../common/ErrorModal';
import { Redirect } from 'react-router-dom';

const chains = [
    { value: 'Ethereum', label: 'Ethereum' },
    { value: 'Solana', label: 'Solana' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'Avalanche', label: 'Avalanche' },
]

const chainCoins = {
    'Ethereum': [
        { value: 'Coin1', label: 'Coin1' },
        { value: 'Coin2', label: 'Coin2' },
        { value: 'Coin3', label: 'Coin3' },
        { value: 'Coin4', label: 'Coin4' },
        { value: 'Coin5', label: 'Coin5' },
    ],
    'Solana': [
        { value: 'Coin1', label: 'Coin1' },
        { value: 'Coin2', label: 'Coin2' },
        { value: 'Coin3', label: 'Coin3' },
        { value: 'Coin4', label: 'Coin4' },
        { value: 'Coin5', label: 'Coin5' },
    ],
    'Polygon': [
        { value: 'Coin1', label: 'Coin1' },
        { value: 'Coin2', label: 'Coin2' },
        { value: 'Coin3', label: 'Coin3' },
        { value: 'Coin4', label: 'Coin4' },
        { value: 'Coin5', label: 'Coin5' },
    ],
    'Avalanche': [
        { value: 'Coin1', label: 'Coin1' },
        { value: 'Coin2', label: 'Coin2' },
        { value: 'Coin3', label: 'Coin3' },
        { value: 'Coin4', label: 'Coin4' },
        { value: 'Coin5', label: 'Coin5' },
    ],
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
        setCoins(chainCoins[selectedChain])
        setSelectedCoins({})
        setDefaultCoinValue('')
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
                <Col lg={5} sm={12}>
                    <h2 className="module-title">New Index</h2>
                </Col>
                <Col lg={7} sm={12}>
                    <Row  className="chain-selector-wrapper">
                        <Col lg={4} sm={12}>
                            <h4 className="container-title">Select Chain</h4>
                        </Col>
                        <Col lg={8} sm={12}>
                            <Select
                                className="chain-selector"
                                onChange={onChainSelect}
                                options={chains}
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
