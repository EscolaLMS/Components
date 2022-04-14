React component example:

### Default themes

```js
import themes from "../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";

Object.entries(themes).map((theme) => (
  <ThemeProvider theme={theme[1]} key={theme[0]}>
    <div style={{ background: "#E4E4E4", padding: "5px 15px", margin: "5px" }}>
      <Title> Theme {theme[0]}</Title>
      {[1, 2, 3, 4].map((level) => (
        <Title key={level} level={level}>
          Title level {level}.
        </Title>
      ))}
    </div>
  </ThemeProvider>
));
```

### Custom theme

```js
import { GlobalThemeProvider } from "../../theme/provider";

<GlobalThemeProvider>
  <Title>This is title h1. Lorem ipsum</Title>
  <Title level={2}>This is title h2. Lorem ipsum</Title>
  <Title level={3}>This is title h3. Lorem ipsum</Title>
  <Title level={4}>This is title h4. Lorem ipsum</Title>
</GlobalThemeProvider>;
```
