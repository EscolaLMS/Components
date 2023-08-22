```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";
import { ICONS } from "./icons";

const icons = Object.keys(ICONS);

<ThemeTester>
  {icons.map((name) => (
    <Icon name={name} />
  ))}
</ThemeTester>;
```
