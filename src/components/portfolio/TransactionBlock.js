import React from 'react';
import {  
    ListGroup,
    Form,
    ListGroupItem,
} from 'react-bootstrap';

const BasketListContainer = (props) => {
    let { type, buyInputPlaceHolder, fund } = props;

    const getContainer = () => {
        if (type === 'cefi') {
            return (
                <div className="transaction-block cefi-buy">
                    <ListGroup
                        className="min-invest-block">
                        <ListGroupItem>
                            <p className="min-invest-amount">{fund['min_invest'].toFixed(2)} USD</p>
                            <p>Minimum Invest</p>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup
                        className="transaction-breakup-block">
                        <ListGroupItem>
                            Platform Fee
                            <p>{fund['platform_fee'].toFixed(2)}%</p>
                        </ListGroupItem>
                        <ListGroupItem>
                            Manager Fee
                            <p>{fund['manager_fee'].toFixed(2)}%</p>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            )
        } else {
            return (
                <div className="transaction-block  defi-buy">
                    <ListGroup className="fund-action-list-group">
                        <ListGroup.Item style={{ border: '0' }}>
                            <Form.Group controlId="pay-with-input">
                                <Form.Label
                                    style={{
                                        fontSize: 'larger',
                                    }}>
                                    Pay With
                                </Form.Label>
                                <Form.Control
                                    className="pay-with-input form-input"
                                    type="text"
                                    placeholder="0.000000 USDC"
                                    name="paymentIndex"
                                    required
                                />
                            </Form.Group>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ border: '0' }}>
                            <Form.Group controlId="buy-input">
                                <Form.Label
                                    style={{
                                        fontSize: 'larger',
                                    }}>
                                    Bid
                                </Form.Label>
                                <Form.Control
                                    className="buy-input form-input"
                                    type="text"
                                    placeholder= {buyInputPlaceHolder}
                                    name="buyIndex"
                                    readOnly
                                />
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup
                        className="transaction-breakup-block">
                        <ListGroupItem>
                            Minimum Receive
                            <p>0.00000</p>
                        </ListGroupItem>
                        <ListGroupItem>
                            Network Fee
                            <p>0.000 USDC</p>
                        </ListGroupItem>
                        <ListGroupItem>
                            Platform Fee
                            <p>0.000 USDC</p>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            );
        }
    };
    return getContainer();
};

export default BasketListContainer;
