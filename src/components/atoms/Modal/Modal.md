```js
import { useState } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import { ImageModal, ThemeTester } from "../../../styleguide";
import Title from "../../atoms/Typography/Title";
import Text from "../../atoms/Typography/Text";
import img1 from "./Modal.png";

const [visible, setVisible] = useState(false);

const onToggleDialog = () => {
  setVisible((value) => !value);
};

<React.Fragment>
  <ThemeTester>
    <button onClick={onToggleDialog}>launch modal</button>
  </ThemeTester>
  <GlobalThemeProvider>
    <Modal
      onClose={onToggleDialog}
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
    >
      <Title level={4} className="modal-title">
        Modal title
      </Title>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid
        autem ea earum id minima necessitatibus nulla perferendis porro, rem,
        vitae voluptates. Dolor doloremque eum ipsum iusto modi recusandae
        velit?
      </Text>
    </Modal>
  </GlobalThemeProvider>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
