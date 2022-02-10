import React from 'react';
import { Table, Image } from 'react-bootstrap';

const tokens = [
	{
		name: 'Uniswap',
		image: 'https://token-icons.s3.amazonaws.com/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
		quantity: '3.309 UNI',
		price: '$25.72',
		allocation: '$85.14',
		share: '25.47%',
	}, {
		name: 'Aave Token',
		image: 'https://token-icons.s3.amazonaws.com/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
		quantity: '0.21 AAVE',
		price: '$300.57',
		allocation: '$63.38',
		share: '18.98%',
	}, {
		name: 'Maker',
		image: 'https://s3.amazonaws.com/token-icons/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png',
		quantity: '0.014 MKR',
		price: '$2,498.07',
		allocation: '$35.99',
		share: '10.78%',
	}, {
		name: 'SushiToken',
		image: 'https://token-icons.s3.amazonaws.com/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png',
		quantity: '3.082 SUSHI',
		price: '$10.70',
		allocation: '$32.97',
		share: '9.88%',
	}, {
		name: 'Compound',
		image: 'https://token-icons.s3.amazonaws.com/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
		quantity: '0.094 COMP',
		price: '$306.24',
		allocation: '$28.84',
		share: '8.64%',
	}, {
		name: 'Synthetix Network Token',
		image: 'https://token-icons.s3.amazonaws.com/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png',
		quantity: '2.796 SNX',
		price: '$9.43',
		allocation: '$26.37',
		share: '7.9%',
	}, {
		name: 'yearn.finance',
		image: 'https://token-icons.s3.amazonaws.com/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png',
		quantity: '0.00057 YFI',
		price: '$35,187.92',
		allocation: '$20.08',
		share: '6.01%',
	}, {
		name: 'Republic Token',
		image: 'https://token-icons.s3.amazonaws.com/0x408e41876cccdc0f92210600ef50372656052a38.png',
		quantity: '14.086 REN',
		price: '$0.99',
		allocation: '$13.93',
		share: '4.17%',
	}, {
		name: 'LoopringCoin v2',
		image: 'https://token-icons.s3.amazonaws.com/0xbbbbca6a901c926f240b89eacb641d8aec7aeafd.png',
		quantity: '19.919 LRC',
		price: '$0.43',
		allocation: '$8.57',
		share: '2.57%',
	}
];

const DistributionTable = () => {
	return (
		<div className="distribution-table-container">
			<Table className="distribution-table borderless">
				<thead>
					<tr>
						<th className="table-header">Assets</th>
						<th className="table-header">Quantity</th>
						<th className="table-header">Price</th>
						<th className="table-header">Allocation</th>
						<th className="table-header">Share</th>
					</tr>
				</thead>
				<tbody>
					{
						tokens.map((token, index) => {
							return (
								<tr className="token-info-row">
									<td>
										<div className="token-info">
											<Image src={token.image} className="token-icon"></Image>
											<p className="token-name">{token.name}</p>
										</div>
									</td>
									<td>
										<p className="token-quantity">{token.quantity}</p>
									</td>
									<td>
										<p className="token-price">{token.price}</p>
									</td>
									<td>
										<p className="token-allocation">{token.allocation}</p>
									</td>
									<td>
										<p className="token-share">{token.share}</p>
									</td>
								</tr>
							);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default DistributionTable;
