### Default themes

```js
import themes from "../../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";
import img1 from "./Option.png";
import ImageModal from "../../../styleguide/ImageModal";
import Text from "../Typography/Text";

import Title from "../Typography/Title";

<React.Fragment>
  {Object.entries(themes).map((theme) => (
    <ThemeProvider theme={theme[1]} key={theme[0]}>
      <Text>Theme {theme[0]}</Text>
      <Text>Checkbox without label</Text>
      <Checkbox name={`c1-${theme[0]}`} checked />
      <Text>Checkbox with primitive label</Text>
      <Checkbox name={`c2-${theme[0]}`} label="dummy label" />
      <hr />
    </ThemeProvider>
  ))}

  <ImageModal images={[img1]} />
</React.Fragment>;
```

```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import Text from "../Typography/Text";
import img1 from "./Option.png";

<GlobalThemeProvider>
  <Text>checked Checkbox without label</Text>
  <Checkbox name="c3" checked />
  <Text>Checkbox without label</Text>
  <Checkbox name="c4" />
  <Text>Checkbox with primitive label</Text>
  <Checkbox name="c5" label="dummy label" />
  <Text>Checkbox with sophisticated label</Text>{" "}
  <Checkbox
    name="c6"
    label={
      <strong>
        dummy <em>label</em>
      </strong>
    }
  />
  <Checkbox name="c7" checked label={<strong>dummy label</strong>} />
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
