import React from 'react';
import { Image } from 'react-bootstrap';
import rightArrow from '../../assets/images/Vector.png';

const PortfolioLink = (props) => {
    let followers = props.followers;
    let icon = props.img;

    return (
        <a
            className={`portfolio-link ${icon ? 'image-link' : ''}`}
            href={props.link}>
            {icon && <Image src={icon} className="portfolio-icon"></Image>}
            <p className="link-title">{props.name}</p>
            {followers && <p className="followers-count">{followers}</p>}
            <Image src={rightArrow} className="arrow-right-icon"></Image>
        </a>
    );
};

export default PortfolioLink;
