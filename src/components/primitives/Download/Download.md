```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Download.png";
import Download from "./Download";

<GlobalThemeProvider>
  <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
  <Download
    href="https://escolalms.github.io/headless-format/paper.pdf"
    fileName="myPaper.pdf"
  />

  <Download
    href="https://escolalms.github.io/headless-format/paper.pdf"
    fileName={<strong>myPaper.pdf</strong>}
    darkTheme
  />

  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
