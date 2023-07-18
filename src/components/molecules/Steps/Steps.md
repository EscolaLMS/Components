```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Steps
      options={[
        {
          label: "4 tygodnie",
          value: "option-1",
        },
        {
          label: "6 tygodni",
          value: "option-2",
        },
        {
          label: "8 tygodni",
          value: "option-3",
        },
        {
          label: "10 tygodni",
          value: "option-4",
        },
      ]}
      checked={2}
    />
  </ThemeTester>
</React.Fragment>;
```
