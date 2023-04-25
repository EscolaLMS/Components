```js
import { useState } from "react";
import { ThemeTester } from "../../../../styleguide";

const question = {
  id: 31,
  type: "multiple_choice",
  score: 1,
  title: "William Shakespear place of death",
  question: "Where did William Shakespear die?",
  options: {
    answers: ["Stratford-upon-Avon", "London", "Birmingham", "Glasgow", "York"],
  },
};

const [value, setValue] = useState("");
<ThemeTester>
  <MultipleChoice
    {...question}
    onChange={(e) => setValue(e.target.value)}
    value={value}
  />
</ThemeTester>;
```
