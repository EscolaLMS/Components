```js
import { addMinutes } from "date-fns";
import ThemeTester from "../../../styleguide/ThemeTester";

const targetDate = addMinutes(new Date(), 2);

const onCountdownEnd = () => console.log("countdown ended!");
<ThemeTester>
  <Countdown targetDate={targetDate} onCountdownEnd={onCountdownEnd} />
</ThemeTester>;
```
