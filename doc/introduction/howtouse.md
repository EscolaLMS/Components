Below is example how to implement `ThemeProvider` with current theme settings. Wrap your application with this context provider, then all componet will be using selected styles.

Values will change once you adapt themes, modes or even use custom colors with theme widget in right upper corner.

### ThemeProvider

```js
import { getThemeFromLocalStorage } from "../../src/styleguide/useLocalTheme";
import { ThemeProvider } from "styled-components";
import { print, stringify } from "q-i";

const theme = getThemeFromLocalStorage();

<React.Fragment>
  <ThemeProvider theme={theme}>
    <textarea
      class="language-js"
      style={{ width: "100%", minHeight: "800px", border: "none" }}
    >
      {`import { ThemeProvider } from "styled-components";
const theme = ${JSON.stringify(theme, null, " ")}

<ThemeProvider theme={theme}>
  {/* your application here */}
</ThemeProvider>  

`}
    </textarea>
  </ThemeProvider>
</React.Fragment>;
```
