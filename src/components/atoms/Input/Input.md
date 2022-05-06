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
    <div style={{ height: 60 }}>
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
    </div>
    <div style={{ height: 60 }}>
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
    </div>
    <div style={{ height: 60 }}>
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
    </div>
    <div style={{ height: 60 }}>
      <Input label="Disabled no value" type="email" disabled />
    </div>
    <div style={{ height: 60 }}>
      <Input
        label="Disabled with value"
        type="email"
        disabled
        value={"email@com"}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
