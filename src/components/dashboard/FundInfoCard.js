import React from 'react';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

import { Link } from 'react-router-dom';

const FundsInfoCard = (props) => {
    const { fund, eventKey, onFundSelect } = props;
    const onClick = (e) => {
        e.preventDefault();
        onFundSelect(eventKey);
    };

    return (
        <ListGroup.Item
            action
            onClick={onClick}
            className="fund-info-container"
            eventKey={eventKey}>
            <Row>
                <Col xl={3} lg={12} className="fund-description">
                    <Image className="fund-icon" src={fund.image} />
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>{fund.name}</Card.Title>
                            <Card.Text>By {fund.creator}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    xl={2}
                    lg={3}
                    className="text-center align-self-center fund-statistics">
                    <Card style={{ width: '100%' }} className="statistics-card">
                        <Card.Body>
                            <Card.Text>AUM</Card.Text>
                            <Card.Title>$ {(fund.value || 0).toFixed(2)}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    xl={2}
                    lg={2}
                    className="text-center align-self-center fund-statistics">
                    <Card style={{ width: '100%' }} className="statistics-card">
                        <Card.Body>
                            <Card.Text>
                                {props.toLedger
                                    ? 'Amt. Invested'
                                    : 'Min. Amount'}
                            </Card.Text>
                            <Card.Title>
                                {props.toLedger
                                    ? `$ ${fund.amt_invested}`
                                    : `$ ${fund.min_invest}`}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    xl={2}
                    lg={2}
                    className="text-center align-self-center fund-statistics">
                    <Card style={{ width: '100%' }} className="statistics-card">
                        <Card.Body>
                            <Card.Text>CAGR</Card.Text>
                            <Card.Title
                                className={
                                    fund.cagr > 0
                                        ? 'text-success'
                                        : fund.cagr < 0
                                        ? 'text-danger'
                                        : 'text-secondary'
                                }>
                                {fund.cagr} %
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    xl={1}
                    lg={2}
                    className="text-center align-self-center fund-statistics">
                    <Card style={{ width: '100%' }} className="statistics-card">
                        <Card.Body>
                            <Card.Text>Investors</Card.Text>
                            <Card.Title>{fund.num_investors}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    xl={2}
                    lg={3}
                    className="text-center align-self-center fund-statistics">
                    <Card style={{ width: '100%' }} className="statistics-card">
                        <Card.Body>
                            <Card.Text>Rating</Card.Text>
                            {/* <Card.Title>{fund.num_investors}</Card.Title> */}
                            <ReactStars
                                classNames="ratings"
                                count={5}
                                value={3.75}
                                isHalf={true}
                                size={18}
                                edit={false}
                                activeColor="#693BE5"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default FundsInfoCard;
