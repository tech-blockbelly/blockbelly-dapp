import React from 'react';
import { Card } from 'react-bootstrap';

import evmuLogo from '../../../assets/images/indexLogos/EVMU.png';
import makerLogo from '../../../assets/images/indexLogos/BB.png';
import soluLogo from '../../../assets/images/indexLogos/SOLU.png';
import polLogo from '../../../assets/images/indexLogos/POL.png';

import nearLogo from '../../../assets/images/near-protocol.svg';

const FundInfoCard = (props) => {
    const { fund, eventKey, onFundSelect } = props;
    const onClick = (e) => {
        e.preventDefault();
        onFundSelect(eventKey);
    };

    if(!fund.creatorIcon) {
        fund.creatorIcon = makerLogo;
    }
    if (!fund.icon) {
        if (fund.chn == "ethereum") {
            fund.icon = evmuLogo;
        }
        if (fund.chn == "solana") {
            fund.icon = soluLogo;
        }
        if (fund.chn == "near") {
            fund.icon = nearLogo;
        }
        if (fund.chn == "polygon") {
            fund.icon = polLogo;
        }
    }

    return (
        <Card
            className="fund-info-card h-100"
            onClick={onClick}
            eventKey={eventKey}>
            <Card.Body>
                <Card.Title className="fund-title">
                    <Card.Img className="fund-icon" src={fund.icon} />
                    {fund.iName}
                </Card.Title>
                <Card.Text className="fund-description">{fund.iTagLine}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Img className="creator-icon" src={fund.creatorIcon} />
                <p className="creator-name text-muted">By {fund.creator}</p>
            </Card.Footer>
        </Card>
    );
};

export default FundInfoCard;
