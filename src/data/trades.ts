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

export enum OptionType {
  Call = "call",
  Put = "put",
}

export type OptionContract = {
  type: OptionType;
  strike: string;
  expiration: string;
};

interface Trade {
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

export interface OptionTrade extends Trade {
  contract: OptionContract;
}

export interface StockTrade extends Trade {}

export type TradeRecord = OptionTrade | StockTrade;

export type TradeSummary<T = TradeRecord> = {
  kind: TradeKind;
  symbol: string;
  records: T[];
};

export type Trades = {
  options: TradeSummary<OptionTrade>[];
  stocks: TradeSummary<StockTrade>[];
};

function toUniqueOptionIdentifer(record: OptionTrade) {
  return `${record.symbol}:${record.contract.type}:${record.contract.strike}:${record.contract.expiration}`;
}

function toUniqueStockIdenfiter(record: StockTrade) {
  return record.symbol;
}

export function toTradeSummaries(trades: TradeRecord[]): TradeSummary[] {
  const lookup: Record<string, TradeSummary<TradeRecord>> = {};

  trades.forEach(trade => {
    const key =
      trade.kind === TradeKind.Option
        ? toUniqueOptionIdentifer(trade as OptionTrade)
        : toUniqueStockIdenfiter(trade as StockTrade);
    const existing = lookup[key];
    if (existing) {
      existing.records.push(trade);
      return;
    }
    lookup[key] = {
      kind: trade.kind,
      symbol: trade.symbol,
      records: [trade],
    };
  });

  return Object.values(lookup).map<TradeSummary>(summary => {
    const s: TradeSummary = {
      kind: summary.kind,
      symbol: summary.symbol,
      records: summary.records.sort(
        (a, b) => a.createdAt.toSeconds() - b.createdAt.toSeconds(),
      ),
    };
    return s;
  });
}
