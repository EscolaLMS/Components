```js
import img1 from "./LoginForm.png";
import { ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text } from "../../../";

const fieldLabels = {
  email: <strong>Overwrite email label</strong>,
  "AdditionalFields.Privacy Policy": (
    <Text>
      By checking this fields you accept{" "}
      <a href="https://wellms.io">Privacy Policy</a>
    </Text>
  ),
};

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <RegisterForm
        fieldLabels={fieldLabels}
        onSuccess={(res, values) => console.log("onSuccess form", res, values)}
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
</React.Fragment>;
```
