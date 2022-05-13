```js
import { useState } from "react";
import { ThemeTester } from "../../../styleguide";
import { Button } from "../../../";

const [percentage, setPercentage] = useState(Math.round(100 * Math.random()));

<React.Fragment>
  <ThemeTester flexDirection="column">
    <ProgressRing percentage={percentage} />
    <ProgressRing size={32} percentage={percentage} />
    <ProgressRing size={32} strokeWidth={4} percentage={percentage} />
    <Button
      mode="secondary"
      onClick={() => setPercentage(Math.round(100 * Math.random()))}
    >
      Click for random percentage {percentage}%
    </Button>
  </ThemeTester>
</React.Fragment>;
```
