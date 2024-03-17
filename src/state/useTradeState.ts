import { useCallback, useState } from "react";

import { Trades } from "../data/trades";
import localstorage from "../localstorage/localstorage";

const STORAGE_KEY = "trades";

export default function useTradeState() {
  const [trades, setTrades] = useState(
    localstorage.getItem<Trades>(STORAGE_KEY),
  );
  const _setTrades = useCallback(function (_trades: Trades) {
    localstorage.setItem(STORAGE_KEY, _trades);
    setTrades(_trades);
  }, []);
  return [trades, _setTrades];
}
