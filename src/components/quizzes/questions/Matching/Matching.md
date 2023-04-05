```js
import { ThemeTester } from "../../../../styleguide";
import { useState } from "react";

const question = {
  id: 35,
  type: "matching",
  score: 1,
  title: "",
  question: "Match the following countries with their corresponding capitals.",
  options: {
    sub_questions: ["Italy", "India", "Japan", "Canada"],
    sub_answers: ["Ottawa", "Rome", "New Delhi", "Tokyo"],
  },
};

const [values, setValues] = useState({});

<ThemeTester>
  <div style={{ ul: { padding: "0px" } }}>
    <Matching {...question} onChange={(v) => console.log(v)} values={values} />
  </div>
</ThemeTester>;
```
