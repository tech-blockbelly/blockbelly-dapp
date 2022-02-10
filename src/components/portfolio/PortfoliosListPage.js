import React, { useEffect, useState } from 'react';
import PortfolioModule from '../dashboard/PortfolioModule';

const data = [
    {
        id: 'popular',
        title: 'Popular',
        funds: [
            {
                name: 'Famous 10 Large Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
                investors: '123',
                returns: '+13.3%',
                link: '/famous-large-caps',
                creator: 'Streetgains Research',
                likes: '112',
            },
            {
                name: 'The Middlemen Mid Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
                investors: '2231',
                returns: '+9.13%',
                link: '/mid-caps',
                creator: 'Streetgains Research',
                likes: '222',
            },
            {
                name: 'Gem Seeker Small Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
                investors: '523',
                returns: '+16.11%',
                link: '/small-caps',
                creator: 'Windmill Capital',
                likes: '312',
            },
            {
                name: 'NFT focused',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCNM_0010.png',
                investors: '1346',
                returns: '+8.3%',
                link: '/nft-focused',
                creator: 'Windmill Capital',
                likes: '192',
            },
        ],
    },
    {
        id: 'socially-famous',
        title: 'Socially Famous',
        funds: [
            {
                name: 'Value & Momentum',
                link: '/james-peters',
                investors: '912',
                returns: '+9.21%',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCMO_0010.png',
                creator: 'Windmill Capital',
                likes: '192',
            },
            {
                name: 'Growth at a Fair Price',
                link: '/simon-croft',
                investors: '997',
                returns: '+ 10.3%',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCMO_0010.png',
                creator: 'Ethical Advisors',
                likes: '772',
            },
            {
                name: 'Vishnu Patel',
                link: '',
                investors: '3109',
                returns: '+13.13%',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCMO_0010.png',
                creator: 'Ethical Advisors',
                likes: '989',
            },
            {
                name: 'Vimal Shah',
                link: '',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCMO_0010.png',
                investors: '1200',
                returns: '+11.06%',
                creator: 'Streetgains Research',
                likes: '698',
            },
            {
                name: 'Sheetal Gigna',
                link: '',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCAW_0001.png',
                investors: '700',
                returns: '+18.09%',
                creator: 'Streetgains Research',
                likes: '292',
            },
        ],
    },
    {
        id: 'others',
        title: 'Others',
        funds: [
            {
                name: 'Large Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCAW_0001.png',
                investors: '675',
                link: '/large-caps',
                returns: '+8.3%',
                creator: 'Streetgains Research',
                likes: '392',
            },
            {
                name: 'Mid Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCAW_0001.png',
                investors: '3566',
                link: '/mid-caps',
                returns: '+7.53%',
                creator: 'Ethical Advisors',
                likes: '549',
            },
            {
                name: 'Small Caps',
                image: 'https://assets.smallcase.com/images/smallcases/160/SCAW_0001.png',
                investors: '1231',
                link: '/small-caps',
                returns: '+12.3%',
                creator: 'Windmill Capital',
                likes: '492',
            },
        ],
    },
];

const PortfoliosListPage = (props) => {
    return (
        // <Container className="component-container portfolios-listing-page">
        <PortfolioModule title={'Explore Baskets'} />
        // </Container>
    );
};

export default PortfoliosListPage;
