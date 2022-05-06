```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Steps.png";

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

  <ImageModal images={[img1]} />
</React.Fragment>;
```
