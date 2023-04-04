```js
import { addMinutes } from "date-fns";
import { useState } from "react";
import { ThemeTester } from "../../styleguide";

const [attempt, setAttempt] = useState({
  id: 165,
  user_id: 95,
  topic_gift_quiz_id: 6,
  started_at: "2023-03-29T14:05:48.000000Z",
  end_at: addMinutes(new Date(), 1),
  max_score: 9,
  result_score: 4,
  is_ended: false,
  questions: [
    {
      id: 31,
      type: "multiple_choice",
      score: 1,
      title: "Grants tomb",
      question: "Who is buried in Grant's tomb in New York City?",
      options: {
        answers: ["Grant", "No one", "Napoleon", "Churchill", "Mother Teresa"],
      },
    },
    {
      id: 32,
      type: "multiple_choice_with_multiple_right_answers",
      score: 1,
      title: "",
      question: "What two people are entombed in Grant's tomb?",
      options: {
        answers: ["No one", "Grant", "Grant's wife", "Grant's father"],
      },
    },
    {
      id: 33,
      type: "true_false",
      score: 1,
      title: "TrueStatement about Grant",
      question: "Grant was buried in a tomb in New York City.",
      options: [],
    },
    {
      id: 35,
      type: "matching",
      score: 1,
      title: "",
      question:
        "Match the following countries with their corresponding capitals.",
      options: {
        sub_questions: ["Italy", "India", "Japan", "Canada"],
        sub_answers: ["Ottawa", "Rome", "New Delhi", "Tokyo"],
      },
    },
    {
      id: 38,
      type: "numerical_question",
      score: 1,
      title: "",
      question: "When was Ulysses S. Grant born?",
      options: [],
    },
    {
      id: 39,
      type: "essay",
      score: 1,
      title: "",
      question: "Write a short biography of Dag Hammarskjöld.",
      options: [],
    },
    {
      id: 40,
      type: "description",
      score: 1,
      title: "",
      question:
        "You can use your pencil and paper for these next math questions.",
      options: [],
    },
    {
      id: 41,
      type: "multiple_choice",
      score: 1,
      title: "",
      question:
        "Mahatma Gandhi's birthday is an Indian holiday on _____ of October.",
      options: {
        answers: ["15th", "3rd", "2nd"],
      },
    },
    {
      id: 42,
      type: "short_answers",
      score: 1,
      title: "",
      question: "Who's buried in Grant's tomb?",
      options: [],
    },
  ],
  answers: [],
});

const startQuiz = () =>
  setAttempt((prev) => ({
    ...prev,
    is_ended: false,
    end_at: addMinutes(new Date(), 1).toString(),
    started_at: new Date().toString(),
  }));

const endQuiz = () => setAttempt((prev) => ({ ...prev, is_ended: true }));
<ThemeTester>
  <GiftQuizPlayerContent
    attempt={attempt}
    startQuiz={startQuiz}
    endQuiz={endQuiz}
    sendAnswer={(questionId, answer) => console.log({ questionId, answer })}
  />
</ThemeTester>;
```
