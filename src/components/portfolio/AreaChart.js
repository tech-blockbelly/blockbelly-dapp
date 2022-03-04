import React, { useEffect, useState } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { getAPIClient } from '../../httpClient';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';

const DataFormater = (number) => {
    if (number > 1000) {
        return (number / 1000).toString() + 'K';
    } else {
        return number.toString();
    }
};

const DateFormater = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    return dd + '/' + mm;
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        let avg_price = (payload[0].value / 1000).toFixed(1).toString() + 'K';
        return (
            <div className="custom-tooltip">
                <p className="day-label">{`${label.toLocaleString()}`}</p>
                <p className="avg-price-label">
                    Avg. Price : <span>{`${avg_price}`}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomAreaChart = ({ fund, endpoint, type }) => {
    const [data, setNewData] = useState([]);

    useEffect(() => {
        getAPIClient()
            .get(`${endpoint}/${fund.id}/chart/?days=${120}`)
            .then((res) => {
                const chart = res.data;
                let localData = [];
                console.log(chart.prices);
                localData = localData.concat(
                    (chart.prices || []).map((price) => {
                        let date = new Date(price[0]);
                        return {
                            day: date,
                            avg_price: price[1],
                        };
                    }),
                );
                type == 'cefi'
                    ? setNewData(localData.slice(0, localData.length - 2))
                    : setNewData(localData.slice(0, localData.length));
            });
    }, [fund]);

    let indexValue = data.length
        ? data[data.length - 1].avg_price.toFixed(2)
        : 0;
    indexValue = type == 'cefi' ? indexValue / 1000 : indexValue;
    const day_delta = data.length
        ? ((data[data.length - 1].avg_price - data[data.length - 2].avg_price) /
              data[data.length - 1].avg_price) *
          100
        : 0;
    return (
        <div className="areachart-container">
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
                            <h1 style={{ display: 'inline' }}>
                                {type == 'defi' ? '$' : ''} {indexValue}
                            </h1>
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
                        <p>Current Value</p>
                    </div>
                    <h5>Performance</h5>
                    <Row>
                        <Col md={12}>
                            <ResponsiveContainer
                                className="area-chart"
                                height="100%"
                                minHeight={300}>
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 10,
                                        bottom: 20,
                                    }}>
                                    <defs>
                                        <linearGradient
                                            id="colorPrice"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="#693BE5"
                                                stopOpacity={0.9}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#693BE5"
                                                stopOpacity={0.2}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="day"
                                        tickFormatter={DateFormater}>
                                        <Label
                                            value="Day"
                                            offset={0}
                                            position="bottom"
                                        />
                                    </XAxis>
                                    <YAxis tickFormatter={DataFormater}>
                                        <Label
                                            value="Price (USD)"
                                            angle="-90"
                                            position="insideLeft"
                                            offset={0}
                                        />
                                    </YAxis>
                                    {/* <CartesianGrid strokeDasharray="3" /> */}
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="avg_price"
                                        stroke="#693BE5"
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default CustomAreaChart;
