```js
import { ThemeTester } from "../../../../styleguide";
const question = {
  id: 39,
  type: "essay",
  score: 1,
  title: "",
  question: "Write a short biography of Dag Hammarskjöld.",
  options: [],
};

<ThemeTester>
  <Essay {...question} sendAnswer={(v) => console.log(v)} />
</ThemeTester>;
```
