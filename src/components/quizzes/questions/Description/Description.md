```js
import { ThemeTester } from "../../../../styleguide";
const question = {
  id: 40,
  type: "description",
  score: 1,
  title: "",
  question: "You can use your pencil and paper for these next math questions.",
  options: [],
};
<ThemeTester>
  <Description {...question} sendAnswer={(v) => console.log(v)} />
</ThemeTester>;
```
