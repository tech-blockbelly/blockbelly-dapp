import React from 'react';
import { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = [
    '#00C49F',
    '#FFBB28',
    '#693BE5',
    '#FE554F',
    '#26D6D6',
    '#54d59f',
    '#8512BE',
    '#FF8042',
    '#F7F727',
    '#0088FE',
];

const CustomPieChart = ({ coins }) => {
    const coins_data = useMemo(() => {
        return [].concat(
            (coins || []).map((coin, index) => {
                return {
                    name: coin[0],
                    allocation: coin[1],
                    fill: COLORS[index],
                };
            }),
        );
    }, coins);

    let renderLabel = function (entry) {
        return entry.name + ` : ` + entry.allocation + `% `;
    };

    if (!coins) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <div className="pieChart-legend-container">
            <h5>Distribution</h5>
            <Row>
                <Col>
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minHeight={400}>
                        <PieChart>
                            <Pie
                                data={coins_data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={120}
                                fill="#8884d8"
                                label={renderLabel}
                                paddingAngle={5}
                                dataKey="allocation">
                                {coins_data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.fill}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </div>
    );
};

export default CustomPieChart;
