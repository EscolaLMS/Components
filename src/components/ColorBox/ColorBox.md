React component example:

### Default themes

```js
import themes from "../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";

Object.entries(themes).map((theme) => (
  <ThemeProvider theme={theme[1]} key={theme[0]}>
    <div style={{ display: "flex" }}>
      <ColorBox mode="primary">Lorem ipsum</ColorBox>
      <ColorBox mode="secondary">Lorem ipsum</ColorBox>
    </div>
    <hr />
  </ThemeProvider>
));
```

### Custom theme

```js
import { GlobalThemeProvider } from "../../theme/provider";

<GlobalThemeProvider>
  <div style={{ display: "flex" }}>
    <ColorBox mode="primary">Lorem ipsum</ColorBox>
    <ColorBox mode="secondary">Lorem ipsum</ColorBox>
  </div>
</GlobalThemeProvider>;
```
