React component example:

### Default

```js
import { GlobalThemeProvider } from "../../theme/provider";

<GlobalThemeProvider>
  <MainColor>
    <button
      onClick={() => {
        window.localStorage.setItem(
          "theme",
          JSON.stringify({
            mainColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          })
        );
        window.dispatchEvent(new Event("themeChange"));
      }}
    >
      push me for random color
    </button>
  </MainColor>
</GlobalThemeProvider>;
```
