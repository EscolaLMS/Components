```js
import { GlobalThemeProvider } from "../../../theme/provider";
import Text from "../Typography/Text";
import ThemeTester from "../../../styleguide/ThemeTester";
import { getUniqueId } from "../../../utils/utils";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Text noMargin={true} id={getUniqueId("checkedWithoutLabel", true)}>
      checked Checkbox without label
    </Text>
    <Checkbox
      name="c3"
      defaultChecked
      aria-labelledby={getUniqueId("checkedWithoutLabel", true)}
    />
    <Text noMargin={true} id={getUniqueId("withoutLabel", true)}>
      Checkbox without label
    </Text>
    <Checkbox name="c4" aria-labelledby={getUniqueId("withoutLabel", true)} />
    <Text noMargin={true}>Checkbox with primitive label</Text>
    <Checkbox name="c5" label="dummy label" />
    <Text noMargin={true}>Checkbox with sophisticated label</Text>{" "}
    <Checkbox
      name="c6"
      label={
        <strong>
          dummy <em>label</em>
        </strong>
      }
    />
    <Checkbox name="c7" label={<strong>dummy label</strong>} defaultChecked />
  </ThemeTester>
</React.Fragment>;
```
