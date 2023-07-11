```js
import img1 from "./Rating.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Rating ratingValue={4.1} label={4.1} />
    <Rating ratingValue={5} />
    <Rating ratingValue={4} />
    <Rating ratingValue={3} />
    <Rating ratingValue={2} />
    <Rating ratingValue={1} />
    <Rating ratingValue={0} />
  </ThemeTester>
</React.Fragment>;
```
