```js
import img1 from "./LoginForm.png";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text } from "../../../";

const fieldLabels = {
  email: <strong>Overwrite email label</strong>,
  "AdditionalFields.Privacy Policy": (
    <p>
      By checking this fields you accept{" "}
      <a href="https://wellms.io">Privacy Policy</a>
    </p>
  ),
};

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <RegisterForm
        fieldLabels={fieldLabels}
        onSuccess={() => console.log("onSuccess")}
        onError={(err) => console.log("onError", err.data)}
        onLoginLink={() => console.log("onLoginLink")}
        return_url="?action=_after_click_from_email"
      />

      <Text>Mobile version</Text>
      <div style={{ maxWidth: "400px" }}>
        <RegisterForm mobile />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
