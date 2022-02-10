import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PortfolioLink from './PortfolioLink';

const SwitchMenu = (props) => {
    const [active, setActive] = useState(0);

    let info = props.data;

    return (
        <div className="switch-menu-container">
            <div className="menu-items">
                {info.map((element, index) => (
                    <Button
                        key={index}
                        data-folio-id={element.id}
                        className={`switch-btn ${
                            index === active ? 'selected' : 'not-selected'
                        }`}
                        onClick={() => setActive(index)}>
                        {element.title}
                    </Button>
                ))}
            </div>
            <div className="portfolio-list-wrapper">
                {info.map((element, index) => (
                    <div
                        id={element.id}
                        className={`portfolio-list ${
                            index === active ? 'selected' : 'not-selected'
                        }`}
                        key={index}>
                        {element.portfolios.map((portfolio, index) => (
                            <PortfolioLink
                                key={index}
                                followers={portfolio.followers}
                                img={portfolio.image}
                                name={portfolio.name}
                                link={portfolio.link}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwitchMenu;
