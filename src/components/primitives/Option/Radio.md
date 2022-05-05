```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import Text from "../Typography/Text";
import img1 from "./Option.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Text noMargin={true}>checked Radio without label</Text>
    <Radio name="r3" checked />
    <Text noMargin={true}>Radio without label</Text>
    <Radio name="r4" />
    <Text noMargin={true}>Radio with primitive label</Text>
    <Radio name="r5" label="dummy label" />
    <Text noMargin={true}>Radio with sophisticated label</Text>{" "}
    <Radio
      name="r6"
      label={
        <strong>
          dummy <em>label</em>
        </strong>
      }
    />
    <Radio name="r5" checked label={<strong>dummy label</strong>} />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
