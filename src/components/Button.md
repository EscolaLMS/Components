React component example:

### Default

```js
<Button size="large" primary={true}>
  Push Me
</Button>
```

### dark theme

```js
import { darkTheme } from "../theme/dark.ts";
import { ThemeProvider } from "styled-components";

<ThemeProvider theme={darkTheme}>
  <Button size="large" primary={false} color="black">
    Push Me
  </Button>
</ThemeProvider>;
```

### light theme

```js
import { lightTheme } from "../theme/light.ts";
import { ThemeProvider } from "styled-components";

<ThemeProvider theme={lightTheme}>
  <Button size="large" primary={false} color="black">
    Push Me
  </Button>
</ThemeProvider>;
```
