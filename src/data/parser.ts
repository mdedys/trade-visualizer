import { fromQuestrade } from "./questrade";
import Source from "./source";
import { Trades } from "./trades";

export async function read(file: File, source: Source): Promise<Trades> {
  const text = await file.text();
  switch (source) {
    case Source.Questrade:
      return fromQuestrade(text);
    default:
      throw new Error("unknown file source");
  }
}
