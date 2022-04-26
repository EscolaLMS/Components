### Default theme

```js
import { ThemeProvider } from "styled-components";
import Download from "./Download";
import themes from "../../../theme";
import Title from "../Typography/Title";
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Download.png";

<React.Fragment>
  <ThemeTester>
    <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
    <Download
      href="https://escolalms.github.io/headless-format/paper.pdf"
      fileName="myPaper.pdf"
    />
    <Download
      href="https://escolalms.github.io/headless-format/paper.pdf"
      fileName={<strong>myPaper.pdf</strong>}
    />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
