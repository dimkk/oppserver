import { CardHeader, Card, CardBody, CardFooter } from '@paljs/ui';
import { OkxP2P } from 'lib/types/OKX_P2P';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';

function BYNOkx() {
  const interval = 30000;
  const { isLoading, isFetching, data } = useQuery<OkxP2P>(
    'BYN_USDT_okx',
    () => fetch('/api/v1/okx_byn').then((res) => res.json()),
    {
      refetchInterval: interval,
    },
  );
  return (
    <>
      <Card size="Small">
        <CardHeader>
          OKX USDT TO BYN P2P -{' '}
          <a href="https://www.okx.com/ru/p2p-markets/byn/sell-usdt" target={'_blank'}>
            Link
          </a>
        </CardHeader>
        <CardBody>
          {isLoading && <>Loading...</>}
          {/* {error && <>{JSON.stringify(error, null, 2)}</>} */}
          {!isLoading && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>Price</td>
                  <td>Banks</td>
                  <td>Amount</td>
                  <td>Order Range</td>
                  <td>SuccessRate</td>
                </tr>
              </thead>
              <tbody>
                {data?.data.buy.map((x) => (
                  <tr key={x.id}>
                    <td>{x.price}</td>
                    <td>{x.paymentMethods.map((x) => x + ', ')}</td>
                    <td>{x.availableAmount}</td>
                    <td>{`${x.quoteMinAmountPerOrder} - ${x.quoteMaxAmountPerOrder}`}</td>
                    <td>{x.completedRate}</td>
                  </tr>
                ))}
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

export default BYNOkx;
