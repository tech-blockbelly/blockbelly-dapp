import React from 'react';
import { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
	ResponsiveContainer,
} from "recharts";
import createClass from 'create-react-class';

const colors = [
'#693BE5', '#6348DA', '#5D56CE', '#5763C3', '#5171B7', '#4B7EAC', '#458CA0',  '#3F9995', '#39A789', '#33B47E',
]

const legendStyle = {
  top: '60%',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
		let coin = payload[0].payload.Crypto
		let allocation =payload[0].value
    return (
      <div className="custom-tooltip">
        <p className="day-label">{`${coin} : ${allocation}%` }</p>
      </div>
    );
  }
  return null;
};

const Radialchart = ({ coins }) => {
		const coins_data = useMemo(() => {
				return [].concat(
					(coins || []).map((coin, index) => {
							return {
								Crypto: coin[0],
								Allocation: coin[1],
								fill: colors[index],
							}
					}),)
		}, coins);

		const CustomizedLabel = createClass({
			render () {
				const {cx, cy, viewBox, index} = this.props;
				let mid = (viewBox.innerRadius + viewBox.outerRadius)/2;
				let y = (cy-mid+5).toFixed()
				let x = (cx);

				 return (
				 	<text
						x={x}
						y={y}
						fill={'#BFC7CE'}
						fontSize={12}
						textAnchor="middle"
					>
						{coins_data[index].Crypto}
					</text>
					)
			}
		});

    if (!coins) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <div className="Radialchart-legend-container">
            <h5>Distribution</h5>
						<Row>
							<Col>
								<ResponsiveContainer height='100%' minHeight={400}>
									<RadialBarChart
										innerRadius="20%"
										outerRadius="90%"
										data={coins_data}
										startAngle={180}
										endAngle={0}
									>
										<RadialBar
											minAngle={15}
											cx="50%" cy="50%"
											label={<CustomizedLabel />}
											background
											clockWise={true}
											dataKey='Allocation'
											barCategoryGap='25%'
										/>
										<Legend iconSize={15} iconType='circle'
											payload={
												coins_data.map(
													(item, index) => ({
														id: item.Crypto,
														value: `${item.Crypto} (${item.Allocation}%)`,
														color: colors[index % colors.length]
													})
												)
											}
											wrapperStyle={legendStyle}
										/>
										<Tooltip
											content={<CustomTooltip />}
										/>
									</RadialBarChart>
								</ResponsiveContainer>
							</Col>
						</Row>
        </div>
    );
};

export default Radialchart;
