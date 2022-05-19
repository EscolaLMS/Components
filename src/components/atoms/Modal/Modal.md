```js
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./Modal.png";

const [visible, setVisible] = useState(false);

<React.Fragment>
  <ThemeTester>
    <button onClick={() => setVisible(true)}>modal togge</button>
    <Modal onClose={() => setVisible(false)} visible={visible}>
      <div style={{ width: 600, background: "#fff" }}>
        <p>Lorem Ipsum</p>
      </div>
    </Modal>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
