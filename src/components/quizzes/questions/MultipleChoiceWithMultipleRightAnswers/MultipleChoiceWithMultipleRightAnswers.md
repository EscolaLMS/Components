```js
import { useState } from "react";
import { ThemeTester } from "../../../../styleguide";

const question = {
  id: 32,
  type: "multiple_choice_with_multiple_right_answers",
  score: 1,
  title: "",
  question: "What two people are entombed in Grant's tomb?",
  options: {
    answers: ["No one", "Grant", "Grant's wife", "Grant's father"],
  },
};

const [values, setValues] = useState(
  question.options.answers.reduce((acc, val) => ({ ...acc, [val]: false }), {})
);

const onChange = (e) => {
  setValues((prev) => ({ ...prev, [e.target.value]: e.target.checked }));
};
<ThemeTester>
  <MultipleChoiceWithMultipleRightAnswers
    {...question}
    onChange={onChange}
    values={values}
  />
</ThemeTester>;
```
