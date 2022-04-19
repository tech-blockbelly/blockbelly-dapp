import React, { useState, Fragment } from 'react';
import CalculationTable from './CalculationTable';
import {
    Container,
    Row,
    Col,
    Modal,
    Button,
    FormControl,
} from 'react-bootstrap';
import { getAPIClient } from '../../httpClient';

import { BiBadgeCheck } from 'react-icons/bi';
import { VscError } from 'react-icons/vsc';
import { Link, NavLink, Redirect } from 'react-router-dom';

const TransactionPage = (props) => {
    let { id, action, type } = props;

    const [formData, setFormData] = useState({
        amount: 0,
    });

    const { amount } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const [appState, setAppState] = useState({
        loading: true,
        investDetails: {},
        investmentBreakdown: [],
        coinSymbols: [],
        fees: {},
    });

    const endpoint = type == 'cefi' ? 'portfolio' : 'indices';
    const getInvestmentDetails = () => {
        console.log('Table should now be visible');
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [ledgerId, setLedgerId] = useState(null);
    const [viewLedger, setViewLedger] = useState(null);

    const investInFund = (e) => {
        console.log('Invest should happen now');
    };

    const actions = () => {
        let actionView = null;
        if (showSuccess) {
            actionView = (
                <Button
                    className="proceed-btn btn"
                    onClick={() => {
                        setViewLedger(true);
                    }}
                >
                    View
                </Button>
            );
        } else if (showError) {
            actionView = (
                <Button onClick={props.onHide} className="cancel-btn btn">
                    Close
                </Button>
            );
        } else {
            actionView = (
                <Fragment>
                    <Button onClick={props.onHide} className="cancel-btn btn">
                        Cancel
                    </Button>
                    <Button className="proceed-btn btn" onClick={investInFund}>
                        Proceed
                    </Button>
                </Fragment>
            );
        }
        return actionView;
    };

    const content = () => {
        let c = null;
        if (showSuccess) {
            c = (
                <div className="text-center">
                    <div className="no-selection">
                        <h1 className="text-success">
                            <BiBadgeCheck size={70} />
                        </h1>
                        <p>Successfuly placed order</p>
                    </div>
                </div>
            );
        } else if (showError) {
            c = (
                <div className="text-center">
                    <div className="no-selection">
                        <h1 className="text-danger">
                            <VscError size={70} />
                        </h1>
                        <p>Failed to place order</p>
                    </div>
                </div>
            );
        } else {
            c = (
                <Fragment>
                    <Container className="component-container transaction-page">
                        <Row>
                            <Col md={12} className="transaction-container">
                                <div className="transaction-block-wrapper">
                                    <div className="transaction-input-block">
                                        <h2 className="block-title">
                                            Investment Amount?
                                            <span>*</span>
                                            <small className="small-text">(In USDC)</small>
                                        </h2>
                                        <FormControl
                                            placeholder="Enter amount"
                                            aria-label="Investment Amount"
                                            className="amount-input"
                                            name="amount"
                                            onChange={onChange}
                                            value={amount}
                                        />
                                        <Button
                                            className="view-details-btn"
                                            onClick={getInvestmentDetails}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} className="px-0">
                                <CalculationTable
                                    calculationData={
                                        appState.investmentBreakdown
                                    }
                                    coinSymbols={appState.coinSymbols}
                                    fees={appState.fees}
                                    className={`${
                                        Object.keys(appState.investDetails)
                                            .length
                                            ? ''
                                            : 'hide'
                                    }`}
                                />
                            </Col>
                            <Col md={12} className="disclaimer">
                                PLEASE NOTE: Incorrect wallet address can lead
                                to loss of funds. Please confirm address before
                                proceeding.
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            );
        }
        return c;
    };

    if (viewLedger) {
        return <Redirect to={{ pathname: `/ledger/${ledgerId}` }} />;
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="transaction-modal"
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body>{content()}</Modal.Body>
            <Modal.Footer className="button-wrapper">{actions()}</Modal.Footer>
        </Modal>
    );
};

export default TransactionPage;
