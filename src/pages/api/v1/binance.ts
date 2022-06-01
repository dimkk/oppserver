import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let opts = {
    page: 1,
    rows: 10,
    payTypes: [],
    publisherType: null,
    asset: 'USDT',
    tradeType: 'SELL',
    fiat: 'RUB',
  };
  if (req.body) opts = req.body;
  const resp = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', opts);

  res.status(200).send(JSON.stringify(resp.data, null, 2));
};
