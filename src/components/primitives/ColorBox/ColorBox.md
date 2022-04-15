React component example:

### Default themes

```js
import themes from "../../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";
import img1 from "./ColorBox.png";
import ImageModal from "../../../styleguide/ImageModal";

import Title from "../Typography/Title";

<React.Fragment>
  {Object.entries(themes).map((theme) => (
    <ThemeProvider theme={theme[1]} key={theme[0]}>
      <Title>Theme {theme[0]}</Title>
      <div style={{ display: "flex" }}>
        <ColorBox mode="primary">primary</ColorBox>
        <ColorBox mode="secondary">secondary</ColorBox>
      </div>
      <hr />
    </ThemeProvider>
  ))}

  <ImageModal images={[img1]} />
</React.Fragment>;
```

### Custom theme

```js
import { GlobalThemeProvider } from "../../../theme/provider";

<GlobalThemeProvider>
  <div style={{ display: "flex" }}>
    <ColorBox mode="primary">primary</ColorBox>
    <ColorBox mode="secondary">secondary</ColorBox>
  </div>
</GlobalThemeProvider>;
```
