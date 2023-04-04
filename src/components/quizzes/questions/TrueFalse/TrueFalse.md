```js
import { useState } from "react";
import { ThemeTester } from "../../../../styleguide";

const question = {
  id: 33,
  type: "true_false",
  score: 1,
  title: "TrueStatement about Grant",
  question: "Grant was buried in a tomb in New York City.",
  options: [],
};

const [value, setValue] = useState("");

<ThemeTester>
  <TrueFalse
    {...question}
    onChange={(e) => setValue(e.target.value)}
    value={value}
  />
</ThemeTester>;
```
