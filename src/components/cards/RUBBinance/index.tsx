import { Card, CardBody, CardFooter, CardHeader } from '@paljs/ui';
import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';

function RUBBinance() {
  const interval = 30000;

  // kucoin https://www.kucoin.com/_api/otc/ad/list?currency=USDT&side=SELL&legal=RUB&page=1&pageSize=10&status=PUTUP&lang=en_US
  const { isLoading, isFetching, data } = useQuery(
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
    <>
      <Card size="Small">
        <CardHeader>Binance p2p Prices 1000 USD equivalent</CardHeader>
        <CardBody>
          {isLoading && <>Loading...</>}
          {/* {error && <>{JSON.stringify(error, null, 2)}</>} */}
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
                  <td>{(parseFloat(btc_p2p.data?.data?.data[0]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}</td>
                  <td>{(parseFloat(btc_p2p.data?.data?.data[1]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}</td>
                  <td>{(parseFloat(btc_p2p.data?.data?.data[2]?.adv.price) * parseFloat(btc_1000usd)).toFixed(2)}</td>
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
                  <td>{(parseFloat(shib_p2p.data?.data?.data[0]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}</td>
                  <td>{(parseFloat(shib_p2p.data?.data?.data[1]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}</td>
                  <td>{(parseFloat(shib_p2p.data?.data?.data[2]?.adv.price) * parseFloat(shib_1000usd)).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </CardBody>
        <CardFooter>
          Status: {!isFetching && <>Idle</>}
          {isFetching && <>Fetching..</>}
          {/* {error && <>{error.message}</>} */}
        </CardFooter>
      </Card>
    </>
  );
}

export default RUBBinance;
