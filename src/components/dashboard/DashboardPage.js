import React, { useEffect, useState } from 'react';
import PortfolioModule from './PortfolioModule';
import { getAPIClient } from '../../httpClient';
import { Container, Row, Col } from 'react-bootstrap';
import AccountInfoCard from './AccountInfoCard';

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
const investedInfo = {
    title: 'Invested',
    value: '$2,510.92',
};
const cagrInfo = {
    title: 'CAGR (1YR)',
    value: '+9.12%',
};
const stakedInfo = {
    title: 'Staked',
    value: '-',
};
const DashboardPage = () => {
    const [appState, setAppState] = useState({
        loading: true,
        funds: [],
    });

    const [summary, setsummary] = useState({
        loading: true,
        total_invested: 0,
        total_cagr: 0,
        total_holding: 0,
    });

    useEffect(() => {
        getAPIClient()
            .get('profile/portfolio/')
            .then((res) => {
                const allFunds = res.data;
                const funds = allFunds.map((fund) => {
                    return {
                        ...fund.portfolio,
                        ledger_id: fund.id,
                        amt_invested: fund.amt_invested,
                        value: fund.value,
                    };
                });
                setAppState({
                    ...appState,
                    loading: false,
                    funds,
                });
            });
    }, [setAppState]);

    useEffect(() => {
        getAPIClient()
            .get('profile/summary/')
            .then((res) => {
                const data = res.data;
                setsummary({
                    ...summary,
                    ...data,
                });
            });
    }, [setsummary]);

    const { funds } = appState;

    return (
        <Container fluid className="module-container dashboard-page">
            <div className="account-overview-wrapper">
                <h2 className="container-title">Account Snapshot</h2>
                <Row>
                    <Col xl={4} md={6} sm={12}>
                        <AccountInfoCard
                            data={{
                                title: 'Invested',
                                value: `$ ${(
                                    summary.total_invested || 0
                                ).toFixed(2)}`,
                            }}
                        />
                    </Col>
                    <Col xl={4} md={6} sm={12}>
                        <AccountInfoCard
                            data={{
                                title: 'CAGR',
                                value: `${(summary.total_cagr || 0).toFixed(
                                    2,
                                )}%`,
                            }}
                        />
                    </Col>
                    <Col xl={4} md={6} sm={12}>
                        <AccountInfoCard
                            data={{
                                title: 'Current Worth',
                                value: `$ ${(
                                    summary.total_holding || 0
                                ).toFixed(2)}`,
                            }}
                        />
                    </Col>
                </Row>
            </div>
            <PortfolioModule
                title={'Portfolio'}
                funds={funds}
                data={data}
                toLedger
                type={'user-funds'}
            />
        </Container>
    );
};

export default DashboardPage;
