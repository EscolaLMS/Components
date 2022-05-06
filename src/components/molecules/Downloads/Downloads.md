### Default theme

```js
import { ThemeProvider } from "styled-components";
import themes from "../../../theme";
import Title from "../../atoms/Typography/Title";
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Downloads.png";

<React.Fragment>
  <ThemeTester>downloads</ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
