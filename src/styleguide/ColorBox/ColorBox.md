React component example:

```js
import ThemeTester from "../../../styleguide/ThemeTester";

import themes from "../../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";
import img1 from "./ColorBox.png";

import Title from "../Typography/Title";

<React.Fragment>
  <ThemeTester>
    <div style={{ display: "flex" }}>
      <ColorBox mode="primary">primary</ColorBox>
      <ColorBox mode="secondary">secondary</ColorBox>
    </div>
  </ThemeTester>
</React.Fragment>;
```
