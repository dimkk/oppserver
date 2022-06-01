import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useState } from 'react';
import Layout from 'Layouts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Table from 'react-bootstrap/Table';

import { Fetcher } from 'components/Fetcher';
import { useQuery } from 'react-query';
import axios from 'axios';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Cards(props: any) {
  const interval = 30000;
  const { isLoading, isIdle, isFetching, error, data } = useQuery(
    'USDT_p2p',
    () => fetch('/api/v1/binance').then((res) => res.json()),
    {
      refetchInterval: interval,
    },
  );
  const btc_p2p = useQuery(
    'BTC_p2p',
    () =>
      axios.post('/api/v1/binance', {
        page: 1,
        rows: 10,
        payTypes: [],
        publisherType: null,
        asset: 'BTC',
        tradeType: 'SELL',
        fiat: 'RUB',
      }),
    {
      refetchInterval: interval,
    },
  );
  const btc_price = useQuery('btc_price', () => axios.get('/api/v1/binance_price?symbol=BTCUSDT'), {
    refetchInterval: 3000,
  });

  const btc_1000usd = (1000 / parseFloat(btc_price.data?.data.price)).toFixed(6);

  const shib_p2p = useQuery(
    'SHIB_p2p',
    () =>
      axios.post('/api/v1/binance', {
        page: 1,
        rows: 10,
        payTypes: [],
        publisherType: null,
        asset: 'SHIB',
        tradeType: 'SELL',
        fiat: 'RUB',
      }),
    {
      refetchInterval: interval,
    },
  );
  const shib_price = useQuery('shib_price', () => axios.get('/api/v1/binance_price?symbol=SHIBUSDT'), {
    refetchInterval: interval,
  });
  const shib_1000usd = (1000 / parseFloat(shib_price.data?.data.price)).toFixed(2);

  return (
    <Layout title="Cards">
      <Row>
        <Col breakPoint={{ xs: 12, md: 12 }}>
          <Card size="Small">
            <CardHeader>Binance p2p Prices 1000 USD equivalent</CardHeader>
            <CardBody>
              {isLoading && <>Loading...</>}
              {error && <>{JSON.stringify(error, null, 2)}</>}
              {!isLoading && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <td>Token</td>
                      <td>Amount</td>
                      <td>top1/max/min</td>
                      <td>top2/amount/max/min</td>
                      <td>top3/amount/max/min</td>
                      <td>Total1</td>
                      <td>Total2</td>
                      <td>Total3</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>USDT</td>
                      <td>1000</td>
                      <td>
                        {data?.data[0]?.adv.price} / {Math.round(data?.data[0]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(data?.data[0]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {data?.data[1]?.adv.price}/ {Math.round(data?.data[1]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(data?.data[1]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {data?.data[2]?.adv.price}/ {Math.round(data?.data[2]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(data?.data[2]?.adv.minSingleTransAmount)}
                      </td>
                      <td>{parseFloat(data?.data[0]?.adv.price) * 1000}</td>
                      <td>{parseFloat(data?.data[1]?.adv.price) * 1000}</td>
                      <td>{parseFloat(data?.data[2]?.adv.price) * 1000}</td>
                    </tr>
                    <tr>
                      <td>BTC</td>
                      <td>{btc_1000usd}</td>
                      <td>
                        {btc_p2p.data?.data?.data[0]?.adv.price} /{' '}
                        {Math.round(btc_p2p.data?.data?.data[0]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(btc_p2p.data?.data?.data[0]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {btc_p2p.data?.data?.data[1]?.adv.price}/{' '}
                        {Math.round(btc_p2p.data?.data?.data[1]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(btc_p2p.data?.data?.data[1]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {btc_p2p.data?.data?.data[2]?.adv.price}/{' '}
                        {Math.round(btc_p2p.data?.data?.data[2]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(btc_p2p.data?.data?.data[2]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {(parseFloat(btc_p2p.data?.data?.data[0]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}
                      </td>
                      <td>
                        {(parseFloat(btc_p2p.data?.data?.data[1]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}
                      </td>
                      <td>
                        {(parseFloat(btc_p2p.data?.data?.data[2]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>SHIB</td>
                      <td>{shib_1000usd}</td>
                      <td>
                        {shib_p2p.data?.data?.data[0]?.adv.price} /{' '}
                        {Math.round(shib_p2p.data?.data?.data[0]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(shib_p2p.data?.data?.data[0]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {shib_p2p.data?.data?.data[1]?.adv.price}/{' '}
                        {Math.round(shib_p2p.data?.data?.data[1]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(shib_p2p.data?.data?.data[1]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {shib_p2p.data?.data?.data[2]?.adv.price}/{' '}
                        {Math.round(shib_p2p.data?.data?.data[2]?.adv.maxSingleTransAmount)} /{' '}
                        {Math.round(shib_p2p.data?.data?.data[2]?.adv.minSingleTransAmount)}
                      </td>
                      <td>
                        {(parseFloat(shib_p2p.data?.data?.data[0]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}
                      </td>
                      <td>
                        {(parseFloat(shib_p2p.data?.data?.data[1]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}
                      </td>
                      <td>
                        {(parseFloat(shib_p2p.data?.data?.data[2]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </CardBody>
            <CardFooter>
              Status: {!isFetching && <>Idle</>}
              {isFetching && <>Fetching..</>}
              {error && <>{error.message}</>}
            </CardFooter>
          </Card>
        </Col>
        {/* <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader>Simple card</CardHeader>
            <CardBody>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </Col> */}
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card status="Info">
            <CardHeader>Status card</CardHeader>
            <CardBody>Hello Card component this body of card</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card status="Primary">
            <CardHeader>Status card</CardHeader>
            <CardBody>Hello Card component this body of card</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card status="Primary" accent="Info">
            <CardHeader>Status and accent card</CardHeader>
            <CardBody>Hello Card component this body of card</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12, md: 6 }}>
          <Card accent="Info">
            <CardHeader>Card with accent</CardHeader>
            <CardBody>Hello Card component this body of card</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
