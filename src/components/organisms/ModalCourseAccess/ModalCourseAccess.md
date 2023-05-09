```js
import { useState, useContext } from "react";
import {
  EscolaLMSContextProvider,
  EscolaLMSContext,
} from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../../styleguide";
import Authbtn from "../../../utils/components/authbtn";
import { Button, Title, Text, Modal } from "../../..";

const InnerContent = () => {
  const { token } = useContext(EscolaLMSContext);

  const [visible, setVisible] = useState(false);
  const closeModal = () => setVisible(false);

  if (!token) {
    return <Authbtn />;
  }

  return (
    <>
      <Button
        onClick={() => setVisible((prevVisible) => !prevVisible)}
        mode="secondary"
      >
        Open modal
      </Button>
      <Modal
        onClose={closeModal}
        visible={visible}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose
        width={800}
      >
        <ModalCourseAccess
          onCancel={closeModal}
          course={{ id: 1, title: "Example course" }}
        />
      </Modal>
    </>
  );
};

<EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
  <ThemeTester>
    <InnerContent />
  </ThemeTester>
</EscolaLMSContextProvider>;
```
