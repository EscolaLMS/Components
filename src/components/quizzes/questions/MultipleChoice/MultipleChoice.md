```js
import { useState } from "react";
import { ThemeTester } from "../../../../styleguide";

const question = {
  id: 31,
  type: "multiple_choice",
  score: 1,
  title: "Grants tomb",
  question: "Who is buried in Grant's tomb in New York City?",
  options: {
    answers: ["Grant", "No one", "Napoleon", "Churchill", "Mother Teresa"],
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
