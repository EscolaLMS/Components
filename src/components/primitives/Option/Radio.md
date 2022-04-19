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
      <Text>Radio without label</Text>
      <Radio name={`c1-${theme[0]}`} checked />
      <Text>Radio with primitive label</Text>
      <Radio name={`c1-${theme[0]}`} label="dummy label" />
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
  <Text>checked Radio without label</Text>
  <Radio name="r3" checked />
  <Text>Radio without label</Text>
  <Radio name="r4" />
  <Text>Radio with primitive label</Text>
  <Radio name="r5" label="dummy label" />
  <Text>Radio with sophisticated label</Text>{" "}
  <Radio
    name="r6"
    label={
      <strong>
        dummy <em>label</em>
      </strong>
    }
  />
  <Radio name="r5" checked label={<strong>dummy label</strong>} />
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
