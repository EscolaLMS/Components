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
    sub_questions: ["Poland", "France", "Germany", "Czech Republic"],
    sub_answers: ["Warsaw", "Berlin", "Prague", "Paris"],
  },
};

const [values, setValues] = useState({});

<ThemeTester>
  <div style={{ ul: { padding: "0px" } }}>
    <Matching {...question} onChange={(v) => console.log(v)} values={values} />
  </div>
</ThemeTester>;
```
