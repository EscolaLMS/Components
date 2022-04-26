```js
import { GlobalThemeProvider } from "../../../theme/provider";
import Download from "./Download";

<GlobalThemeProvider>
  <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
    <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
    <Download
      href="https://escolalms.github.io/headless-format/paper.pdf"
      fileName="myPaper.pdf"
    />
    <Download
      href="https://escolalms.github.io/headless-format/paper.pdf"
      fileName={<strong>myPaper.pdf</strong>}
    />
  </div>
</GlobalThemeProvider>;
```

### Dark mode

```js
import { ThemeProvider } from "styled-components";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Download.png";
import Download from "./Download";
import { orangeTheme as defaultTheme } from "../../../theme/orange";

<React.Fragment>
  <ThemeProvider theme={{
    ...defaultTheme,
    mode: "dark"
  }}>
    <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
      <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
      <Download
        href="https://escolalms.github.io/headless-format/paper.pdf"
        fileName="myPaper.pdf"
      />
      <Download
        href="https://escolalms.github.io/headless-format/paper.pdf"
        fileName={<strong>myPaper.pdf</strong>}
      />
    </div>
  </ThemeProvider>

  <ImageModal images={[img1]} />
 
</React.Fragment>;
```
