import { fromQuestrade } from "./questrade";
import Source from "./source";

export async function read(file: File, source: Source) {
  const text = await file.text();
  switch (source) {
    case Source.Questrade:
      return fromQuestrade(text);
    default:
      throw new Error("unknown file source");
  }
}
