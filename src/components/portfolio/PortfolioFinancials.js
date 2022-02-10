import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { IoLogoWhatsapp, IoLogoFacebook, IoCopy } from 'react-icons/io5';
import PieChart from './Piechart';
import AreaChart from './AreaChart';

const PortfolioFinancials = (props) => {
    const { fund, endpoint, type } = props;
    fund.day_delta = -0.06;
    let status = (fund.cagr || 0) >= 0;
    return (
        <Row className="portfolio-info-container">
            <Card border="light" style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Header>
                        <IoLogoWhatsapp className="float-right mx-1" />
                        <IoLogoFacebook className="float-right mx-1" />
                        <IoCopy className="float-right mx-1" />
                    </Card.Header>
                    <Card.Text>
                        <div className="chart-wrapper">
                            <AreaChart fund={fund} endpoint={endpoint} type={type}></AreaChart>
                        </div>
												<div className="chart-wrapper">
														<PieChart coins={fund.coin_details} />
												</div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    );
};

export default PortfolioFinancials;
