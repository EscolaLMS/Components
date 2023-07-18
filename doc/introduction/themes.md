Components are using `styled-components` to be rendered and the **must** be a [`<ThemeProvider />`](https://styled-components.com/docs/advanced#theming) to provider style config to components.

All config values are defined in [`provider.tsx`](https://github.com/EscolaLMS/Components/blob/main/src/theme/provider.tsx) but it's recommended to use one of the following prepared presets - all of the components will be displayed in every available theme colors both in light and dark mode.

### Colors

```js
import ThemeTester from "../../src/styleguide/ThemeTester";
import ColorBox from "../../src/styleguide/ColorBox/ColorBox";
<React.Fragment>
  <ThemeTester>
    <div style={{ display: "flex" }}>
      <ColorBox mode="primary">primary</ColorBox>
      <ColorBox mode="secondary">secondary</ColorBox>
    </div>
  </ThemeTester>
</React.Fragment>;
```
