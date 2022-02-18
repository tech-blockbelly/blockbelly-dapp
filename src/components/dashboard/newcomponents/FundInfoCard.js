import React from 'react';
import { Card } from 'react-bootstrap';

const FundInfoCard = (props) => {
    const { fund, eventKey, onFundSelect } = props;
    const onClick = (e) => {
        e.preventDefault();
        onFundSelect(eventKey);
    };

    return (
        <Card 
            className='fund-info-card h-100'
            onClick={onClick}
            eventKey={eventKey}
        >
            <Card.Body>
                <Card.Title className='fund-title'>
                    <Card.Img className='fund-icon' src={fund.image} />
                    {fund.name}
                </Card.Title>
                <Card.Text className='fund-description'>
                    {fund.desc}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Img className='creator-icon' src={fund.creator_icon} />
                <p className="creator-name text-muted">By {fund.creator}</p>
            </Card.Footer>
        </Card>
    )
}

export default FundInfoCard;