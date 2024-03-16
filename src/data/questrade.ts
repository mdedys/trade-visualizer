import { DateTime } from "luxon";

import { Currency } from "./currency";
import {
  OptionTrade,
  OptionType,
  StockTrade,
  TradeAction,
  TradeKind,
  TradeRecord,
  TradeSummary,
  Trades,
  toTradeSummaries,
} from "./trades";

export type RawQuestradeRecord = {
  transactionDate: string;
  settlementDate: string;
  action: string;
  symbol: string;
  description: string;
  quantity: string;
  price: string;
  gross: string;
  net: string;
  comission: string;
  currency: string;
};

export const ErrUnknownTradeAction = new Error("unknown trade action");

/**
 * Try and extract the action (buy, sell, exp) from the given string
 * @param action String to extract the action from
 * @returns TradeAction | null
 */
function getAction(action: string): TradeAction | null {
  switch (action.toLowerCase()) {
    case TradeAction.Buy:
      return TradeAction.Buy;
    case TradeAction.Sell:
      return TradeAction.Sell;
    case TradeAction.Exp:
      return TradeAction.Exp;
    default:
      return null;
  }
}

const optionKeywords = ["call", "put"];

/**
 * Get the kind of the trade, either an option or stock
 * @param text Text to extract kind from
 * @returns TradeKind
 */
function getKind(text: string): TradeKind {
  // Convert text to lowercase for case-insensitive matching
  text = text.toLowerCase();

  // Check if the text contains keywords specific to options
  if (optionKeywords.some(keyword => text.includes(keyword))) {
    return TradeKind.Option;
  }

  return TradeKind.Stock;
}

/**
 * Tries to option metadata from the description of an option contract
 * @param text Trade description
 * @returns string | undefined
 */
function extractOptionMetadataFromDescription(
  text: string,
): [string, OptionType, string, string] {
  // Ex: CALL CLF 07/16/21 23 CLEVELAND CLIFFS INC WE ACTED AS AGENT
  // The text follows this pattern for Option Contracts. Use
  // simple pattern of grabbing the second piece of text
  const values = text.split(" ");
  const type = values[0] ?? "";
  const symbol = values[1] ?? "";
  const expiration = values[2] ?? "";
  const strike = values[3] ?? "";
  return [symbol, type as OptionType, expiration, strike];
}

/**
 * Convert a raw questrade record to a normalized trade record
 * @param raw RawQuestradeRecord
 * @returns [TradeRecord | null, Error | null]
 */
export function toTradeRecord(
  raw: RawQuestradeRecord,
): [TradeRecord | null, Error | null] {
  const action = getAction(raw.action);
  if (!action) {
    return [null, ErrUnknownTradeAction];
  }

  const kind = getKind(raw.description);

  const partial: Omit<TradeRecord, "kind" | "symbol"> = {
    action,
    currency: raw.currency as Currency,
    price: Math.abs(parseFloat(raw.price)),
    quantity: Math.abs(parseInt(raw.quantity)),
    comission: Math.abs(parseFloat(raw.comission)),
    gross: Math.abs(parseFloat(raw.gross)),
    net: Math.abs(parseFloat(raw.net)),
    createdAt: DateTime.fromMillis(new Date(raw.transactionDate).getTime()),
    settledAt: DateTime.fromMillis(new Date(raw.settlementDate).getTime()),
  };

  // The symbol isn't always the ticket when it comes to option contract.
  // Parse the description and extract out the ticker
  if (kind === TradeKind.Option) {
    const [symbol, type, expiration, strike] =
      extractOptionMetadataFromDescription(raw.description) ?? raw.symbol;
    const option: OptionTrade = {
      ...partial,
      kind,
      symbol,
      contract: {
        type,
        expiration,
        strike,
      },
    };
    return [option, null];
  }

  const stock: StockTrade = {
    ...partial,
    kind,
    symbol: raw.symbol,
  };
  return [stock, null];
}

export function toTradeRecords(raw: RawQuestradeRecord[]): TradeRecord[] {
  return raw.reduce<TradeRecord[]>((list, cur) => {
    const [trade, error] = toTradeRecord(cur);
    if (error || !trade) return list;
    list.push(trade);
    return list;
  }, []);
}

export function fromQuestrade(text: string): Trades {
  // Parse text which will be in csv format and convert into JSON list of
  // RawQuestrade object
  const lines = text.split("\n").slice(1);
  if (!lines) {
    return { options: [], stocks: [] };
  }

  const json = lines.map<RawQuestradeRecord>(next => {
    const items = next.split(",");
    return {
      transactionDate: items[0],
      settlementDate: items[1],
      action: items[2],
      symbol: items[3],
      description: items[4],
      quantity: items[5],
      price: items[6],
      gross: items[7],
      comission: items[8],
      net: items[9],
      currency: items[10],
    };
  });

  console.log(json);

  // Parse each raw record and convert into a TradeRecord
  const parsed = toTradeRecords(json);
  const summary = toTradeSummaries(parsed);
  return {
    options: summary.filter(
      s => s.kind === TradeKind.Option,
    ) as TradeSummary<OptionTrade>[],
    stocks: summary.filter(
      s => s.kind === TradeKind.Stock,
    ) as TradeSummary<StockTrade>[],
  };
}
