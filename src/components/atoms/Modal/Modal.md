```js
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./Modal.png";
import { Button, Title, Text } from "../../..";

const ModalWrapper = () => {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <Button
        onClick={() => setVisible((prevVisible) => !prevVisible)}
        mode="secondary"
      >
        launch modal
      </Button>
      <Modal
        onClose={() => setVisible(false)}
        visible={visible}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        width={800}
      >
        <Title level={4} className="modal-title">
          Modal title
        </Title>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          aliquid autem ea earum id minima necessitatibus nulla perferendis
          porro, rem, vitae voluptates. Dolor doloremque eum ipsum iusto modi
          recusandae velit?
        </Text>
      </Modal>
    </React.Fragment>
  );
};

<React.Fragment>
  <ThemeTester>
    <ModalWrapper />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
