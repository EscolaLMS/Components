```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./ProgressBar.png";
import ThemeTester from "../../../styleguide/ThemeTester";
import ProgressBar from "./ProgressBar";

<GlobalThemeProvider>
  <ThemeTester>
    <ProgressBar currentProgress={10} maxProgress={10} />
    <ProgressBar currentProgress={5} maxProgress={10} />
    <ProgressBar currentProgress={1.4} maxProgress={10} />
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
