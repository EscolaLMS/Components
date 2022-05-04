```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import Text from "../Typography/Text";
import img1 from "./Option.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Text style={{marginBottom: 0}}>checked Checkbox without label</Text>
    <Checkbox name="c3" checked />
    <Text style={{marginBottom: 0}}>Checkbox without label</Text>
    <Checkbox name="c4" />
    <Text style={{marginBottom: 0}}>Checkbox with primitive label</Text>
    <Checkbox name="c5" label="dummy label" />
    <Text style={{marginBottom: 0}}>Checkbox with sophisticated label</Text>{" "}
    <Checkbox
      name="c6"
      label={
        <strong>
          dummy <em>label</em>
        </strong>
      }
    />
    <Checkbox name="c7" checked label={<strong>dummy label</strong>} />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
