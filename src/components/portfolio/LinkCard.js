import React from 'react';
import Image from 'react-bootstrap/Image';
import tiltArrow from '../../assets/images/tiltArrow.png';

const LinkCard = (props) => {
    let fact = props.fact;
    return (
        <div className="link-card-container">
            <p className="excerpt">{fact.fact}</p>
            <a href={fact.link} className="link-btn btn">
                <Image src={tiltArrow} className="link-icon"></Image>
            </a>
        </div>
    );
};

export default LinkCard;
