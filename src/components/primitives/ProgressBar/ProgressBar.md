```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { useState } from "react";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./ProgressBar.png";
import ThemeTester from "../../../styleguide/ThemeTester";
import ProgressBar from "./ProgressBar";

const [currentProgreses, setCurrentProgreses] = useState({
  progress1: 10,
  progress2: 5,
  progress3: 1.4,
});

const randomProgress = () => (Math.random() * 10).toFixed(2);

const setRandomProgresses = () => {
  setCurrentProgreses({
    progress1: randomProgress(),
    progress2: randomProgress(),
    progress3: randomProgress(),
  });
};

<GlobalThemeProvider>
  <ThemeTester>
    <ProgressBar
      currentProgress={currentProgreses.progress1}
      maxProgress={10}
    />
    <ProgressBar
      currentProgress={currentProgreses.progress2}
      maxProgress={10}
    />
    <ProgressBar
      currentProgress={currentProgreses.progress3}
      maxProgress={10}
    />
    <button onClick={setRandomProgresses}>random progress</button>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
