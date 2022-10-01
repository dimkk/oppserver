// To parse this data:
//
//   import { Convert, OkxP2P } from "./file";
//
//   const okxP2P = Convert.toOkxP2P(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface OkxP2P {
  code: number;
  data: Data;
  detailMsg: string;
  error_code: string;
  error_message: string;
  msg: string;
}

export interface Data {
  sell: any[];
  buy: Buy[];
}

export interface Buy {
  alreadyTraded: boolean;
  availableAmount: string;
  baseCurrency: BaseCurrency;
  black: boolean;
  cancelledOrderQuantity: number;
  completedOrderQuantity: number;
  completedRate: string;
  creatorType: CreatorType;
  guideUpgradeKyc: boolean;
  id: string;
  intention: boolean;
  maxCompletedOrderQuantity: number;
  maxUserCreatedDate: number;
  merchantId: string;
  minCompletedOrderQuantity: number;
  minCompletionRate: string;
  minKycLevel: number;
  minSellOrders: number;
  mine: boolean;
  nickName: string;
  paymentMethods: string[];
  price: string;
  publicUserId: string;
  quoteCurrency: QuoteCurrency;
  quoteMaxAmountPerOrder: string;
  quoteMinAmountPerOrder: string;
  quoteScale: number;
  quoteSymbol: QuoteSymbol;
  receivingAds: boolean;
  safetyLimit: boolean;
  side: Side;
  userType: UserType;
}

export enum BaseCurrency {
  Usdt = 'usdt',
}

export enum CreatorType {
  Certified = 'certified',
}

export enum QuoteCurrency {
  Byn = 'byn',
}

export enum QuoteSymbol {
  Br = 'Br',
}

export enum Side {
  Buy = 'buy',
}

export enum UserType {
  All = 'all',
  Common = 'common',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toOkxP2P(json: string): OkxP2P {
    return cast(JSON.parse(json), r('OkxP2P'));
  }

  public static okxP2PToJson(value: OkxP2P): string {
    return JSON.stringify(uncast(value, r('OkxP2P')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  OkxP2P: o(
    [
      { json: 'code', js: 'code', typ: 0 },
      { json: 'data', js: 'data', typ: r('Data') },
      { json: 'detailMsg', js: 'detailMsg', typ: '' },
      { json: 'error_code', js: 'error_code', typ: '' },
      { json: 'error_message', js: 'error_message', typ: '' },
      { json: 'msg', js: 'msg', typ: '' },
    ],
    false,
  ),
  Data: o(
    [
      { json: 'sell', js: 'sell', typ: a('any') },
      { json: 'buy', js: 'buy', typ: a(r('Buy')) },
    ],
    false,
  ),
  Buy: o(
    [
      { json: 'alreadyTraded', js: 'alreadyTraded', typ: true },
      { json: 'availableAmount', js: 'availableAmount', typ: '' },
      { json: 'baseCurrency', js: 'baseCurrency', typ: r('BaseCurrency') },
      { json: 'black', js: 'black', typ: true },
      { json: 'cancelledOrderQuantity', js: 'cancelledOrderQuantity', typ: 0 },
      { json: 'completedOrderQuantity', js: 'completedOrderQuantity', typ: 0 },
      { json: 'completedRate', js: 'completedRate', typ: '' },
      { json: 'creatorType', js: 'creatorType', typ: r('CreatorType') },
      { json: 'guideUpgradeKyc', js: 'guideUpgradeKyc', typ: true },
      { json: 'id', js: 'id', typ: '' },
      { json: 'intention', js: 'intention', typ: true },
      { json: 'maxCompletedOrderQuantity', js: 'maxCompletedOrderQuantity', typ: 0 },
      { json: 'maxUserCreatedDate', js: 'maxUserCreatedDate', typ: 0 },
      { json: 'merchantId', js: 'merchantId', typ: '' },
      { json: 'minCompletedOrderQuantity', js: 'minCompletedOrderQuantity', typ: 0 },
      { json: 'minCompletionRate', js: 'minCompletionRate', typ: '' },
      { json: 'minKycLevel', js: 'minKycLevel', typ: 0 },
      { json: 'minSellOrders', js: 'minSellOrders', typ: 0 },
      { json: 'mine', js: 'mine', typ: true },
      { json: 'nickName', js: 'nickName', typ: '' },
      { json: 'paymentMethods', js: 'paymentMethods', typ: a('') },
      { json: 'price', js: 'price', typ: '' },
      { json: 'publicUserId', js: 'publicUserId', typ: '' },
      { json: 'quoteCurrency', js: 'quoteCurrency', typ: r('QuoteCurrency') },
      { json: 'quoteMaxAmountPerOrder', js: 'quoteMaxAmountPerOrder', typ: '' },
      { json: 'quoteMinAmountPerOrder', js: 'quoteMinAmountPerOrder', typ: '' },
      { json: 'quoteScale', js: 'quoteScale', typ: 0 },
      { json: 'quoteSymbol', js: 'quoteSymbol', typ: r('QuoteSymbol') },
      { json: 'receivingAds', js: 'receivingAds', typ: true },
      { json: 'safetyLimit', js: 'safetyLimit', typ: true },
      { json: 'side', js: 'side', typ: r('Side') },
      { json: 'userType', js: 'userType', typ: r('UserType') },
    ],
    false,
  ),
  BaseCurrency: ['usdt'],
  CreatorType: ['certified'],
  QuoteCurrency: ['byn'],
  QuoteSymbol: ['Br'],
  Side: ['buy'],
  UserType: ['all', 'common'],
};
