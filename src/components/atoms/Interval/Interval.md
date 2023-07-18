```js
import img1 from "./Interval.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <Interval current={1} max={1} />
    <Interval current={39} max={50} />
    <Interval current={30} max={100} />
    <Interval current={15} max={100} />
    <Interval current={5} max={100} />
    <Interval current={0} max={100} />
  </ThemeTester>
</React.Fragment>;
```
