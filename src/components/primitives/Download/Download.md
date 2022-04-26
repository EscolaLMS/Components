### Default theme

```js
import { ThemeProvider } from "styled-components";
import Download from "./Download";
import themes from "../../../theme";
import Title from "../Typography/Title";

<React.Fragment>
  {Object.entries(themes).map((theme) => (
      <ThemeProvider 
        theme={{
          ...theme[1],
          mode: "light"
        }} 
        key={theme[0]}
      >
      <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px 0" }}>
        <Title level={4}>Theme {theme[0]} mode ligth</Title>
        <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
      </div>
    </ThemeProvider>
  ))}
  {Object.entries(themes).map((theme) => (
      <ThemeProvider theme={theme[1]} key={theme[0]}>
      <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px 0" }}>
        <Title level={4}>Theme {theme[0]} mode dark</Title>
        <Download href="https://escolalms.github.io/headless-format/paper.pdf" />
      </div>
    </ThemeProvider>
  ))}
</React.Fragment>;
```

### Custom theme

```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Download.png";
import Download from "./Download";
import { orangeTheme as defaultTheme } from "../../../theme/orange";

<GlobalThemeProvider>
  <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px 0" }}>
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
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
