import React, { useState } from 'react';
import { Image, Row, Col, Form } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AllocationCard = (props) => {
    const [ratingValue, setRatingValue] = useState(props.defaultValue);

    let coin = props.coin;

    const updateRange = (e) => {
        props.changeCoinDistribution(coin.value, e.currentTarget.value);
        setRatingValue(e.currentTarget.value);
    }

    return (
        <div className="coin-allocation-card">
            <Row className="coin-details-block">
                <Col lg={1} sm={12} className="action-btn-col" >
                    <a className="delete-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            props.removeCoinFromSelection(coin.value);
                        }}>
												<RiDeleteBin6Line />
                    </a>
                </Col>
                <Col lg={11} sm={12} >
                    <Row>
                        <Col sm={6}  className="coin-title-info">
                            {/* <Image src={coin.image} className="coin-logo" /> */}
														{/* placeholder image. to be removed when correct images are being loaded */}
                            {/* <Image src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/32/color/eth.png'} className="coin-logo" /> */}
                            <h4>{coin.label}</h4>
                        </Col>
                        <Col sm={6} className="coin-rating-block">
														<Form.Control
																className="allocation-range-input form-input"
																type="text"
																value={ratingValue}
																onChange={updateRange}
																required
														/><span>%</span>
                        </Col>
                    </Row>
                    <Row className="allocation-range-block">
                        <Form.Group className="allocation-range">
                            <Form.Control
                                type="range"
                                min="0"
                                max="100"
                                value={ratingValue}
                                onChange={updateRange}
                            />
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AllocationCard;
