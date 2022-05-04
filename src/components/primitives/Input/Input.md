```js
import { useState } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Input.png";
import ThemeTester from "../../../styleguide/ThemeTester";

const [text, setText] = useState("lorem ipsum");

const [texts, setTexts] = useState({
  input1: "",
  input2: "Filled",
  input3: "Error",
});

<React.Fragment>
  <ThemeTester>
    <Input
      label="Empty"
      type="text"
      value={texts.input1}
      onChange={(e) =>
        setTexts({
          ...texts,
          input1: e.target.value,
        })
      }
    />
    <Input
      label="Filled"
      type="text"
      required={true}
      value={texts.input2}
      onChange={(e) =>
        setTexts({
          ...texts,
          input2: e.target.value,
        })
      }
    />
    <Input
      label="Error"
      type="text"
      required={true}
      value={texts.input3}
      onChange={(e) =>
        setTexts({
          ...texts,
          input3: e.target.value,
        })
      }
      error={"To jest error"}
    />
    <Input label="Disabled no value" type="email" disabled />
    <Input
      label="Disabled with value"
      type="email"
      disabled
      value={"email@com"}
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
