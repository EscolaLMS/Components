React component example:

### Default themes

```js
import { DefaultTheme, ThemeProvider } from "styled-components";
import themes from "../../theme";
Object.entries(themes).map((theme) => (
  <ThemeProvider theme={theme[1]} key={theme[0]}>
    <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
      <pre>Theme {theme[0]}</pre>
      <Button>Primary Button</Button>
      {" | "}
      <Button mode="secondary">Secondary button</Button>
      {" | "}
      <Button mode="outline">Outline button</Button>
      <br />
      <br />
      <Button disabled>Primary Button disabled</Button>
      {" | "}
      <Button mode="secondary" disabled>
        Secondary button disabled
      </Button>
    </div>
  </ThemeProvider>
));
```

### Custom theme

```js
import { GlobalThemeProvider } from "../../theme/provider";

<GlobalThemeProvider>
  <div style={{ background: "#E4E4E4", padding: "12px 25px", margin: "12px" }}>
    <Button>Custom theme</Button> {" | "}
    <Button mode="secondary">Secondary button</Button> {" | "}
    <Button mode="outline">Outline button</Button>
  </div>
</GlobalThemeProvider>;
```
