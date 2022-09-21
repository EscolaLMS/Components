```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import Text from "../Typography/Text";
import img1 from "./Option.png";
import ThemeTester from "../../../styleguide/ThemeTester";
import getUniqueId from "../../../utils/utils";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Text noMargin={true} id={getUniqueId("checkedWithoutLabel", true)}>
      checked Radio without label
    </Text>
    <Radio
      name="r3"
      defaultChecked
      aria-labelledby={getUniqueId("checkedWithoutLabel", true)}
    />
    <Text noMargin={true} id={getUniqueId("withoutLabel", true)}>
      Radio without label
    </Text>
    <Radio name="r4" aria-labelledby={getUniqueId("withoutLabel", true)} />
    <Text noMargin={true}>Radio with primitive label</Text>
    <Radio name="r5" label="dummy label" />
    <Text noMargin={true}>Radio with sophisticated label</Text>
    <Radio
      name="r6"
      label={
        <strong>
          dummy <em>label</em>
        </strong>
      }
    />
    <Radio name="r5" defaultChecked label={<strong>dummy label</strong>} />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
