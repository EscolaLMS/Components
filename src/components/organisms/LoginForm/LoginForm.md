```js
import img1 from "./LoginForm.png";
import { ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

import { Text } from "../../../";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <LoginForm
        onSuccess={() => console.log("onSuccess")}
        onError={(err) => console.log("onError", err.data)}
        onResetPasswordLink={() => console.log("onResetPasswordLink")}
        onRegisterLink={() => console.log("onRegisterLink")}
      />
      <Text>Mobile version</Text>
      <div style={{ maxWidth: "400px" }}>
        <LoginForm mobile />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
