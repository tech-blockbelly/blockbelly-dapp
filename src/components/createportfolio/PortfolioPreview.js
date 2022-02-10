import React from 'react';
import {Container, Image, Row, Col, Button, Table} from 'react-bootstrap';

const data = {
	"id": 1,
	"name": "Famous 10 Large Caps",
	"coins": {
			"btc": 50,
			"eth": 30,
			"xrp": 20
	},
	"desc": "Famous 10 Large Caps and some other text to comprise the description of this fund.",
	"access": "private",
	"creator": "atulanilsharma",
	"cagr": 9.5,
	"portfolio_likes": [
			{
					"id": 1,
					"created": "2021-07-16T14:50:02.417451+05:30",
					"user": 1,
					"portfolio": 1
			}
	],
	"portfolio_investors": [
			{
					"id": 5,
					"order_ids": [
							"23277",
							"740",
							"9353"
					],
					"exchange": "binance",
					"amt_invested": 500,
					"portfolio": 1,
					"owner": 7
			},
			{
					"id": 4,
					"order_ids": [
							"23275",
							"738",
							"9350"
					],
					"exchange": "binance",
					"amt_invested": 500,
					"portfolio": 1,
					"owner": 7
			},
			{
					"id": 3,
					"order_ids": [
							"23267",
							"730",
							"9339"
					],
					"exchange": "binance",
					"amt_invested": 500,
					"portfolio": 1,
					"owner": 7
			},
			{
					"id": 2,
					"order_ids": [
							"23265",
							"729",
							"9338"
					],
					"exchange": "binance",
					"amt_invested": 500,
					"portfolio": 1,
					"owner": 7
			},
			{
					"id": 1,
					"order_ids": [
							"23262",
							"728",
							"9337"
					],
					"exchange": "binance",
					"amt_invested": 500,
					"portfolio": 1,
					"owner": 7
			}
	],
	"coin_details": [
			[
					"Bitcoin",
					50
			],
			[
					"Ethereum",
					30
			],
			[
					"XRP",
					20
			]
	]
}

const PortfolioPreview = (props) => {
	return (
		<Container className="portfolio-preview-container">
			<Row className="portfolio-description-wrapper">
				<Col md={3}>
					<Image src={ 'https://assets.smallcase.com/images/smallcases/160/STGMO_0005.png' } className="portfolio-icon"></Image>
				</Col>
				<Col  md={8}>
					<div className="portfolio-description">
						<h3 className="title">PortFolio Name</h3>
						<p className='preamble short-desc'>All Weather Investing is a popular strategy that ensures your investments do well in good as well as bad times. This is a long-term investment strategy that you can use to build wealth over the years to come.</p>
						<p className='preamble minimum-amt-text'>Minimum amount: <h4 className="minimum-amt">$1234</h4></p>
					</div>
				</Col>
			</Row>
			<Row  className="allocations-table-wrapper">
				<Table borderless className="allocations-table">
					<thead>
							<tr>
								<th className="table-header"><h5>Coins</h5></th>
								<th className="table-header"><h5>Returns %</h5></th>
							</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/bco.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">BananaCoin</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">9%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/ant.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Aragon</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/btc.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Bitcoin</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/bcd.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Bitcoin Diamond</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/doge.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Dogecoin</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/etc.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Ethereum Classic</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/uni.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">UniSwap</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
						<tr>
							<td>
								<div className="coin-details">
									<Image
											src={'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/xpr.svg'}
											className="coin-icon"></Image>
									<p className="coin-name">Proton</p>
								</div>
							</td>
							<td>
								<p className="allocation-percent">12%</p>
							</td>
						</tr>
					</tbody>
				</Table>
			</Row>
			<Row className="button-wrapper">
				<Button className="edit-btn" type="button">
						Edit
				</Button>
				<Button className="publish-btn" type="submit">
						Publish
				</Button>
			</Row>
		</Container>
	)
}

export default PortfolioPreview;
