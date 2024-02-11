import { RuleSet } from "styled-components";

export default function variant<K>(
  key: string,
  // @ts-expect-error ignore K mapping
  values: { [key in K]: RuleSet },
) {
  /* eslint-disable-next-line */
  return function (props: any) {
    const _props = props as Record<string, string>;
    const val = _props[key];
    // @ts-expect-error ignore K mapping
    return values[val];
  };
}
