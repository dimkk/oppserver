// https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ticker = await axios.get(
    `https://www.okx.com/v3/c2c/otc-ticker?t=${new Date().getTime()}&baseCurrency=USDT&quoteCurrency=BYN`,
  );
  const resp = await axios.get(
    `https://www.okx.com/v3/c2c/tradingOrders/books?t=${new Date().getTime()}&quoteCurrency=byn&baseCurrency=usdt&side=buy&paymentMethod=all&userType=all&showTrade=false&showFollow=false&showAlreadyTraded=false&isAbleFilter=false&urlId=3`,
  );

  res.status(200).send(resp.data);
};
