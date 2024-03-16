import assert from "node:assert";
import { describe, it } from "node:test";

import { QuestradeTradeCSV, QuestradeTrades } from "./mocks/trades";
import {
  ErrUnknownTradeAction,
  RawQuestradeRecord,
  fromQuestrade,
  toTradeRecord,
} from "./questrade";
import { TradeAction, TradeKind } from "./trades";

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
          input: QuestradeTrades.BUY_CALL_OPTION_NET,
          expect: [TradeKind.Option, TradeAction.Buy, "NET"],
        },
        {
          input: QuestradeTrades.SELL_CALL_OPTION_NET,
          expect: [TradeKind.Option, TradeAction.Sell, "NET"],
        },
        {
          input: QuestradeTrades.EXPIRED_CALL_OPTION_SOFI,
          expect: [TradeKind.Option, TradeAction.Exp, "SOFI"],
        },
        {
          input: QuestradeTrades.BUY_CALL_OPTION_SOFI,
          expect: [TradeKind.Option, TradeAction.Buy, "SOFI"],
        },
        {
          input: QuestradeTrades.BUY_PUT_OPTION_BA,
          expect: [TradeKind.Option, TradeAction.Buy, "BA"],
        },
        {
          input: QuestradeTrades.SELL_PUT_OPTION_BA,
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

  describe("fromQuestrade", () => {
    it("empty csv, should return no trades", () => {
      const result = fromQuestrade("");
      assert.equal(result.options.length, 0);
      assert.equal(result.stocks.length, 0);
    });

    it("csv with records, should create trades", () => {
      const result = fromQuestrade(QuestradeTradeCSV);
      assert.equal(result.options.length, 2);
      assert.equal(result.stocks.length, 1);
    });
  });
});
