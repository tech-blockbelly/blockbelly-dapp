import React from 'react';
import { Fragment } from 'react';
import { Image, Row, Col, Card } from 'react-bootstrap';

const PortfolioInfo = (props) => {
    const { fund, type, ledger } = props;
    fund.day_delta = -0.06;
    let status = (fund.cagr || 0) >= 0;

    return (
        <Row className="portfolio-info-container">
            <Card border="light" style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Text>
                        <Row>
                            <Col className="portfolio-icon-wrapper" xs={4}>
                                <Image
                                    src={fund.image}
                                    className="portfolio-icon"
                                />
                            </Col>
                            <Col xs={8}>
                                <Card
                                    border="light"
                                    style={{ width: '100%' }}
                                    className="title-desc-card">
                                    <Card.Body>
                                        {/* <Card.Title>{fund.name}</Card.Title> */}
                                        <Card.Text>
                                            <h3>{fund.name}</h3>
                                            {type == 'cefi' ? (
                                                <div className="preamble">
                                                    {fund.desc}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {type == 'defi' ? (
                                <Col xs={12}>
                                    <div className="preamble">{fund.desc}</div>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </Card.Text>
                    <Card.Footer>
                        {type == 'defi' ? (
                            <Row className="text-center dpi-links">
                                <Col className="portfolio-info" lg={4}>
                                    <a
                                        className="dpi-link"
                                        href="https://www.indexcoop.com/dpi">
                                        Website{' '}
                                    </a>
                                </Col>
                                <Col className="portfolio-info" lg={4}>
                                    <a
                                        className="dpi-link"
                                        href="https://etherscan.io/token/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b">
                                        Etherscan{' '}
                                    </a>
                                </Col>
                                <Col className="portfolio-info" lg={4}>
                                    <a
                                        className="dpi-link"
                                        href="https://www.coingecko.com/en/coins/defipulse-index">
                                        Coingecko
                                    </a>
                                </Col>
                            </Row>
                        ) : (
                            <Row className="text-center">
                                <Col className="portfolio-info" lg={4}>
                                    {/* <div>Daily Change</div> */}
                                    <div>
                                        {(ledger || {}).value
                                            ? 'Amount Invested'
                                            : 'Basket Value'}
                                    </div>
                                    {/* below should change as well */}
                                    <h4>
                                        ${' '}
                                        {(
                                            (ledger || {}).amt_invested ||
                                            fund.value ||
                                            0
                                        ).toFixed(2)}
                                    </h4>
                                </Col>
                                <Col className="portfolio-info" lg={4}>
                                    <div>CAGR</div>
                                    <h4
                                        className={
                                            fund.cagr > 0
                                                ? 'positive'
                                                : fund.cagr < 0
                                                ? 'negative'
                                                : 'text-secondary'
                                        }>
                                        {fund.cagr} %
                                    </h4>
                                </Col>
                                <Col className="portfolio-info" lg={4}>
                                    <div>Created By</div>
                                    <div>
                                        <b>{fund.creator}</b>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Row>
    );
};

export default PortfolioInfo;
