import Option from "./Option";

import type { OptionType } from "./Option";

export const Radio = (props: Omit<OptionType, "type">) => (
  <Option type="radio" {...props} />
);
