import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Spinner, Row, Col } from 'react-bootstrap';
import { getAPIClient } from '../../httpClient';

const data = [
    ['day', 'a', 'b', 'c', 'd'],
    ['aa', 20, 28, 38, 45],
    ['ab', 31, 38, 55, 66],
    ['ac', 50, 55, 77, 80],
    ['ad', 77, 77, 66, 50],
    ['ae', 68, 56, 42, 15],
    ['af', 28, 26, 32, 45],
    ['ag', 98, 76, 63, 31],
    ['ah', 108, 116, 123, 131],
    ['ai', 87, 76, 53, 31],
    ['aj', 28, 66, 73, 91],
    ['ak', 20, 28, 38, 45],
    ['al', 31, 38, 55, 66],
    ['am', 20, 35, 17, 22],
    ['an', 17, 37, 66, 90],
    ['ao', 38, 26, 12, 15],
];

const Candlestick = ({ fund }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAPIClient()
            .get(`portfolio/${fund.id}/chart/?days=${120}`)
            .then((res) => {
                const chart = res.data;
                let localData = [
                    [{ type: 'date', label: 'Day' }, 'Avg. Price'],
                ];
                localData = localData.concat(
                    (chart.prices || []).map((price) => {
                        return [new Date(price[0]), price[1]];
                    }),
                );
                setData(localData.slice(0, localData.length - 2));
            });
    }, [fund]);

    const indexValue = data.length
        ? (data[data.length - 1][1] / 1000).toFixed(2)
        : 0;
    const day_delta = data.length
        ? ((data[data.length - 1][1] - data[data.length - 2][1]) /
              data[data.length - 1][1]) *
          100
        : 0;
    return (
        <div className="candlestick-container">
            {!data.length ? (
                <div className="loader-container">
                    <Spinner
                        className="loader"
                        animation="border"
                        role="status"></Spinner>
                </div>
            ) : (
                <div>
                    <div className="text-left">
                        <p style={{ display: 'inline' }}>
                            <h1 style={{ display: 'inline' }}>{indexValue}</h1>(
                            <h4
                                style={{ display: 'inline' }}
                                className={
                                    day_delta > 0
                                        ? 'positive'
                                        : day_delta < 0
                                        ? 'negative'
                                        : 'text-secondary'
                                }>
                                {day_delta.toFixed(2)} %
                            </h4>
                        </p>
                        ){/* this value will change */}
                        <p>Current Value</p>
                    </div>
                    <h5>Performance</h5>
                    <Row>
                        <Col md={12}>
                            <Chart
                                height={'400px'}
                                chartType="Line"
                                loader={<div>Loading Chart</div>}
                                data={data}
                                options={{
                                    backgroundColor: 'transparent',
                                    legend: 'none',
                                    series: {
                                        0: { axis: 'Price' },
                                    },
                                    axes: {
                                        y: {
                                            Price: { label: 'Price (USD)' },
                                        },
                                    },
                                }}
                                rootProps={{ 'data-testid': '3' }}
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default Candlestick;
