import { DateTime } from "luxon";

import { Currency } from "./currency";
import { TradeAction, TradeKind, TradeRecord } from "./trading";

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
 * Tries to extract the trade ticker from the description of an option contract
 * @param text Trade description
 * @returns string | undefined
 */
function extractTickerFromDescription(text: string): string | undefined {
  // Ex: CALL CLF 07/16/21 23 CLEVELAND CLIFFS INC WE ACTED AS AGENT
  // The text follows this pattern for Option Contracts. Use
  // simple pattern of grabbing the second piece of text
  const values = text.split(" ");
  return values[1];
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

  let symbol = raw.symbol;
  // The symbol isn't always the ticket when it comes to option contract.
  // Parse the description and extract out the ticker
  if (kind === TradeKind.Option) {
    symbol = extractTickerFromDescription(raw.description) ?? raw.symbol;
  }

  return [
    {
      kind,
      action,
      symbol,
      currency: raw.currency as Currency,
      price: Math.abs(parseFloat(raw.price)),
      quantity: Math.abs(parseInt(raw.quantity)),
      comission: Math.abs(parseFloat(raw.comission)),
      gross: Math.abs(parseFloat(raw.gross)),
      net: Math.abs(parseFloat(raw.net)),
      createdAt: DateTime.fromMillis(new Date(raw.transactionDate).getTime()),
      settledAt: DateTime.fromMillis(new Date(raw.settlementDate).getTime()),
    },
    null,
  ];
}

export function fromQuestrade(text: string) {
  console.log(text.split("\n")[0]);
  const lines = text.split("\n").slice(1);

  console.log(lines[1]);
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
  console.log("json: ", json);
}
