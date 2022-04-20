```js
import { useState } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Input.png";

const [text, setText] = useState("lorem ipsum");

<GlobalThemeProvider>
  <Input
    placeholder="placeholder"
    helper="helper"
    type="email"
    label="l;abel"
    name="var"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />

  <Input type="text" label="text" />

  <Input type="text" label="disabled" value="disabled" disabled />

  <Input type="text" label="readonly" value="readonly" readonly />

  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
