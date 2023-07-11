```js
import { useState } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";

const [text, setText] = useState("lorem ipsum");

const [texts, setTexts] = useState({
  input1: "",
  input2: "Filled",
  input3: "Error",
  input4: "Text",
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
        required
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
        required
        value={texts.input3}
        onChange={(e) =>
          setTexts({
            ...texts,
            input3: e.target.value,
          })
        }
        error={"This is error"}
      />
    </div>
    <div style={{ height: 60 }}>
      <Input
        label="With text helper"
        type="text"
        value={texts.input4}
        onChange={(e) =>
          setTexts({
            ...texts,
            input4: e.target.value,
          })
        }
        helper={<span style={{ marginLeft: 12 }}>Text helper</span>}
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
</React.Fragment>;
```
