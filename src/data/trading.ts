import { DateTime } from "luxon";

import { Currency } from "./currency";

export enum TradeAction {
  Sell = "sell",
  Buy = "buy",
  Exp = "exp",
}

export enum TradeKind {
  Option = "option",
  Stock = "stock",
}

export enum OptionContract {
  Call = "call",
  Put = "put",
}

interface Record {
  kind: TradeKind;
  action: TradeAction;
  symbol: string;
  currency: Currency;
  price: number;
  quantity: number;
  comission: number;
  gross: number;
  net: number;
  createdAt: DateTime;
  settledAt: DateTime;
}

export interface OptionRecord extends Record {
  contract: OptionContract;
}

export interface StockRecord extends Record {}

export type TradeRecord = OptionRecord | StockRecord;
