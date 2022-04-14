React component example:

### Default themes

```js
import { DefaultTheme, ThemeProvider } from "styled-components";
import themes from "../../theme";
import Title from "../Typography/Title";
import img1 from "./Button.png";
import ImageModal from "../../styleguide/ImageModal";

<React.Fragment>
  {Object.entries(themes).map((theme) => (
    <ThemeProvider theme={theme[1]} key={theme[0]}>
      <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
        <Title level={4}>Theme {theme[0]}</Title>
        <br />
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
      </div>{" "}
    </ThemeProvider>
  ))}

  <ImageModal images={[img1]} />
</React.Fragment>;
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
