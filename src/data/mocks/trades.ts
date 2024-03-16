import { RawQuestradeRecord } from "../questrade";

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

const BUY_BALLARD_POWER_SYSTEMS_STOCK: RawQuestradeRecord = {
  action: "Buy",
  currency: "USD",
  comission: "-4.95",
  description: "BALLARD POWER SYSTEMS INC WE ACTED AS AGENT",
  gross: "-1275.00",
  net: "-1279.95",
  price: "12.75000000",
  quantity: "100.0000",
  settlementDate: "2024-01-17 12:00:00 AM",
  symbol: "BLDP.TO",
  transactionDate: "2024-01-16 12:00:00 AM",
};

const BUY_BALLARD_POWER_SYSTEMS_STOCK_2: RawQuestradeRecord = {
  action: "Buy",
  currency: "USD",
  comission: "-4.95",
  description: "BALLARD POWER SYSTEMS INC WE ACTED AS AGENT",
  gross: "-1200.00",
  net: "-1204.95",
  price: "12.00000000",
  quantity: "100.0000",
  settlementDate: "2024-01-23 12:00:00 AM",
  symbol: "BLDP.TO",
  transactionDate: "2024-01-23 12:00:00 AM",
};

const SELL_BALLARD_POWER_SYSTEMS_STOCK: RawQuestradeRecord = {
  action: "Sell",
  currency: "USD",
  comission: "-5.30",
  description: "BALLARD POWER SYSTEMS INC WE ACTED AS AGENT",
  gross: "1275.00",
  net: "1279.95",
  price: "11.05000000",
  quantity: "-100.0000",
  settlementDate: "2024-01-32 12:00:00 AM",
  symbol: "BLDP.TO",
  transactionDate: "2024-01-32 12:00:00 AM",
};

const BUY_LUCKIN_STOCK: RawQuestradeRecord = {
  action: "Buy",
  currency: "USD",
  comission: "-4.96",
  description: "LUCKIN COFFEE INC AMERICAN DEPOSITARY SHARES WE ACTED AS AGENT",
  gross: "17.31",
  net: "12.35",
  price: "7.000000",
  quantity: "10.0000",
  settlementDate: "2024-01-17 12:00:00 AM",
  symbol: "LKNCY",
  transactionDate: "2024-01-17 12:00:00 AM",
};

const SELL_LUCKIN_STOCK: RawQuestradeRecord = {
  action: "Buy",
  currency: "USD",
  comission: "-4.95",
  description: "LUCKIN COFFEE INC AMERICAN DEPOSITARY SHARES WE ACTED AS AGENT",
  gross: "-70.00",
  net: "-74.95",
  price: "7.000000",
  quantity: "10.0000",
  settlementDate: "2024-01-20 12:00:00 AM",
  symbol: "LKNCY",
  transactionDate: "2024-01-20 12:00:00 AM",
};

export const QuestradeTrades = {
  SELL_CALL_OPTION_NET,
  SELL_PUT_OPTION_BA,
  BUY_CALL_OPTION_NET,
  BUY_PUT_OPTION_BA,
  BUY_CALL_OPTION_SOFI,
  EXPIRED_CALL_OPTION_SOFI,
  BUY_BALLARD_POWER_SYSTEMS_STOCK,
  BUY_BALLARD_POWER_SYSTEMS_STOCK_2,
  SELL_BALLARD_POWER_SYSTEMS_STOCK,
  BUY_LUCKIN_STOCK,
  SELL_LUCKIN_STOCK,
};
