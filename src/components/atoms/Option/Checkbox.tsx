import Option from "./Option";

import type { OptionType } from "./Option";

export const Checkbox = (props: Omit<OptionType, "type">) => (
  <Option type="checkbox" {...props} />
);
