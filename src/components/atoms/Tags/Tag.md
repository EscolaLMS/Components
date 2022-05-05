```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Tag.png";

<React.Fragment>
  <ThemeTester layout={"column"}>
    <Tag title={"Kategoria szkolenia"}>Finanse</Tag>
    <Tag title={"Kategoria szkolenia"}>Finanse</Tag>
    <Tag title={"Kategoria szkolenia"}>Finanse</Tag>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
