```js
import { useState } from "react";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./TextArea.png";
import ThemeTester from "../../../styleguide/ThemeTester";

const [text, setText] = useState("lorem ipsum");

const [texts, setTexts] = useState({
  textarea1: "",
  textarea2: "Filled",
  textarea3: "Error",
  textarea4: "Text",
  textarea5: "Large",
});

<React.Fragment>
  <ThemeTester flexDirection="column">
    <TextArea
      label={"TextArea"}
      value={texts.textarea1}
      onChange={(e) =>
        setTexts({
          ...texts,
          textarea1: e.target.value,
        })
      }
    />
    <TextArea
      label={"TextArea filled"}
      value={texts.textarea2}
      required
      onChange={(e) =>
        setTexts({
          ...texts,
          textarea2: e.target.value,
        })
      }
    />
    <TextArea
      label={"TextArea"}
      value={texts.textarea3}
      error={"This is error"}
      onChange={(e) =>
        setTexts({
          ...texts,
          textarea3: e.target.value,
        })
      }
    />
    <TextArea
      label={"TextArea"}
      value={texts.textarea4}
      helper={<span style={{ marginLeft: 12 }}>Text helper</span>}
      onChange={(e) =>
        setTexts({
          ...texts,
          textarea4: e.target.value,
        })
      }
    />
    <TextArea label={"TextArea disabled no value"} disabled />
    <TextArea
      label={"TextArea disabled with value"}
      disabled
      value={"Disabled text"}
    />
    <TextArea
      label={"TextArea Large"}
      rows={10}
      value={texts.textarea5}
      onChange={(e) =>
        setTexts({
          ...texts,
          textarea5: e.target.value,
        })
      }
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
