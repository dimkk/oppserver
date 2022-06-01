// https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let symbol = 'BTCUSDT';
  if (req.query.symbol) symbol = req.query.symbol.toString();
  const resp = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);

  res.status(200).send(JSON.stringify(resp.data, null, 2));
};
