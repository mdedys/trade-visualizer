import assert from "node:assert";
import { describe, it } from "node:test";

import {
  ErrUnknownTradeAction,
  RawQuestradeRecord,
  toTradeRecord,
} from "./questrade";
import { TradeAction, TradeKind } from "./trading";

const EXPIRED_CALL_OPTION_SOFI: RawQuestradeRecord = {
  action: "EXP",
  currency: "USD",
  description:
    "CALL SOFI 02/02/24 9 SOFI TECHNOLOGIES INC OPTION EXPIRATION - EXPIRED",
  comission: "0.00",
  gross: "0.00",
  net: "0.00",
  price: "0.00",
  quantity: "-20.00000",
  settlementDate: "2024-02-05 12:00:00 AM",
  symbol: "8UMPGN7",
  transactionDate: "2024-02-05 12:00:00 AM",
};

const BUY_CALL_OPTION_SOFI: RawQuestradeRecord = {
  action: "Buy",
  currency: "USD",
  comission: "-29.95",
  description:
    "CALL SOFI 02/02/24 9 SOFI TECHNOLOGIES INC WE ACTED AS AGENT AVG PRICE - ASK US FOR DETAILS",
  gross: "-740.00",
  net: "-769.95",
  price: "0.37000000",
  quantity: "20.00000",
  settlementDate: "2024-01-29 12:00:00 AM",
  symbol: "8UMPGN7",
  transactionDate: "2024-01-26 12:00:00 AM",
};

const SELL_CALL_OPTION_NET: RawQuestradeRecord = {
  action: "Sell",
  comission: "-10.96",
  currency: "USD",
  description: "CALL NET 02/23/24 90 CLOUDFLARE INC CL A WE ACTED AS AGENT",
  gross: "632.00",
  net: "621.04",
  price: "6.32000000",
  quantity: "-1.00000",
  settlementDate: "2024-02-09 12:00:00 AM",
  symbol: "NET23Feb24C90.00",
  transactionDate: "2024-02-08 12:00:00 AM",
};

const BUY_CALL_OPTION_NET: RawQuestradeRecord = {
  action: "Buy",
  comission: "-10.95",
  currency: "USD",
  description: "CALL NET 02/23/24 90 CLOUDFLARE INC CL A WE ACTED AS AGENT",
  gross: "-375.00",
  net: "-385.95",
  price: "3.75000000",
  quantity: "1.00000",
  settlementDate: "2024-02-09 12:00:00 AM",
  symbol: "NET23Feb24C90.00",
  transactionDate: "2024-02-08 12:00:00 AM",
};

const BUY_PUT_OPTION_BA: RawQuestradeRecord = {
  action: "Buy",
  comission: "-13.95",
  currency: "USD",
  description: "PUT BA 02/23/24 200 BOEING CO WE ACTED AS AGENT",
  gross: "-620.00",
  net: "-633.95",
  price: "1.55000000",
  quantity: "4.00000",
  settlementDate: "2024-01-09 12:00:00 AM",
  symbol: "BA23Feb24P200.00",
  transactionDate: "2024-01-08 12:00:00 AM",
};

const SELL_PUT_OPTION_BA: RawQuestradeRecord = {
  action: "Sell",
  currency: "USD",
  comission: "-14.95",
  description: "PUT BA 02/23/24 200 BOEING CO WE ACTED AS AGENT",
  gross: "-910.00",
  net: "-924.95",
  price: "5.78000000",
  quantity: "-4.00000",
  settlementDate: "2024-01-17 12:00:00 AM",
  symbol: "BA23Feb24P200.00",
  transactionDate: "2024-01-16 12:00:00 AM",
};

type MetadataTest = {
  input: RawQuestradeRecord;
  expect: [string, string, string];
};

describe("questrade", () => {
  describe("toTradeRecord", () => {
    it("unknown action, should return error", () => {
      // @ts-expect-error partial definition of record
      const [record, error] = toTradeRecord({ action: "blah" });
      assert.equal(record, null);
      assert.equal(error, ErrUnknownTradeAction);
    });

    it("extract metadata from records, should have correct metadata", () => {
      const tests: MetadataTest[] = [
        {
          input: BUY_CALL_OPTION_NET,
          expect: [TradeKind.Option, TradeAction.Buy, "NET"],
        },
        {
          input: SELL_CALL_OPTION_NET,
          expect: [TradeKind.Option, TradeAction.Sell, "NET"],
        },
        {
          input: EXPIRED_CALL_OPTION_SOFI,
          expect: [TradeKind.Option, TradeAction.Exp, "SOFI"],
        },
        {
          input: BUY_CALL_OPTION_SOFI,
          expect: [TradeKind.Option, TradeAction.Buy, "SOFI"],
        },
        {
          input: BUY_PUT_OPTION_BA,
          expect: [TradeKind.Option, TradeAction.Buy, "BA"],
        },
        {
          input: SELL_PUT_OPTION_BA,
          expect: [TradeKind.Option, TradeAction.Sell, "BA"],
        },
      ];

      tests.forEach(test => {
        const [record, error] = toTradeRecord(test.input);
        const [kind, action, symbol] = test.expect;
        assert.ok(record);
        assert.equal(error, null);
        assert.equal(record.kind, kind);
        assert.equal(record.action, action),
          assert.equal(record.symbol, symbol);
      });
    });
  });
});
