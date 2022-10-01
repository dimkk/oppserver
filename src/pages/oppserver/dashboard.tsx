import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import RUBBinance from 'components/cards/RUBBinance';
import BYNOkx from 'components/cards/BYNOkx';

export default function Cards() {
  return (
    <Layout title="Cards">
      <Row>
        <Col breakPoint={{ xs: 12, md: 12 }}>
          <RUBBinance />
        </Col>
        <Col breakPoint={{ xs: 12, md: 12 }}>
          <BYNOkx />
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
