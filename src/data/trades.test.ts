import assert from "node:assert";
import { describe, it } from "node:test";

import { QuestradeTrades } from "./mocks/trades";
import { toTradeRecords } from "./questrade";
import { TradeKind, TradeSummary, toTradeSummaries } from "./trades";

const OPTION_TRADES = toTradeRecords([
  QuestradeTrades.BUY_CALL_OPTION_NET,
  QuestradeTrades.BUY_CALL_OPTION_SOFI,
  QuestradeTrades.EXPIRED_CALL_OPTION_SOFI,
  QuestradeTrades.SELL_CALL_OPTION_NET,
  QuestradeTrades.BUY_PUT_OPTION_BA,
  QuestradeTrades.SELL_PUT_OPTION_BA,
]);

const STOCK_TRADES = toTradeRecords([
  QuestradeTrades.SELL_BALLARD_POWER_SYSTEMS_STOCK,
  QuestradeTrades.BUY_BALLARD_POWER_SYSTEMS_STOCK,
  QuestradeTrades.BUY_LUCKIN_STOCK,
  QuestradeTrades.BUY_BALLARD_POWER_SYSTEMS_STOCK_2,
  QuestradeTrades.SELL_LUCKIN_STOCK,
]);

function getSummaryBySymbol<T>(
  symbol: string,
  summaries: TradeSummary[],
): TradeSummary<T> | undefined {
  return summaries.find(s => s.symbol === symbol) as TradeSummary<T>;
}

describe("trades", () => {
  describe("toTradeSummaries", () => {
    it("only option trades, should create correct summary", () => {
      const summaries = toTradeSummaries(OPTION_TRADES);
      assert.equal(summaries.length, 3);
      const net = getSummaryBySymbol("NET", summaries);
      assert.ok(net);
      assert.equal(net.records.length, 2);
    });

    it("only stock trades, should create correct summary", () => {
      const summaries = toTradeSummaries(STOCK_TRADES);
      assert.equal(summaries.length, 2);
      const bldp = getSummaryBySymbol("BLDP.TO", summaries);
      assert.ok(bldp);
      assert.equal(bldp.records.length, 3);
    });

    it("mixed stock, should create correct summary", () => {
      const summaries = toTradeSummaries(STOCK_TRADES.concat(OPTION_TRADES));
      assert.equal(summaries.length, 5);
      const options = summaries.filter(s => s.kind === TradeKind.Option);
      const stocks = summaries.filter(s => s.kind === TradeKind.Stock);
      assert.equal(options.length, 3);
      assert.equal(stocks.length, 2);
    });
  });
});
