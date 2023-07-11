```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { useState } from "react";
import ThemeTester from "../../../styleguide/ThemeTester";
import Button from "../Button/Button";

const [currentProgresses, setCurrentProgresses] = useState({
  progress1: 10,
  progress2: 5,
  progress3: 1.4,
});

const randomProgress = () => (Math.random() * 10).toFixed(2);

const setRandomProgresses = () => {
  setCurrentProgresses({
    progress1: randomProgress(),
    progress2: randomProgress(),
    progress3: randomProgress(),
  });
};

<GlobalThemeProvider>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <ProgressBar
      currentProgress={currentProgresses.progress1}
      maxProgress={10}
    />
    <ProgressBar
      currentProgress={currentProgresses.progress2}
      maxProgress={10}
    />
    <ProgressBar
      currentProgress={currentProgresses.progress3}
      maxProgress={10}
    />
    <hr />
    <Button mode="outline" onClick={setRandomProgresses}>
      Click to generate random progress
    </Button>
  </ThemeTester>
</GlobalThemeProvider>;
```
