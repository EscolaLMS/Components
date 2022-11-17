```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { ThemeTester } from "../../../styleguide";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./LoginForm.png";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <ResetPasswordForm
        onSuccess={() => console.log("onSuccess")}
        onError={(err) => console.log("onError", err.data)}
        backToLogin={() => console.log("backToLogin")}
        onRegisterLink={() => console.log("onRegisterLink")}
        return_url={"reset"}
      />
      <div style={{ height: 80 }}></div>
      <ResetPasswordForm
        secondStep
        email="example@email.com"
        token="example string"
        onSuccess={() => console.log("onSuccess")}
        onError={(err) => console.log("onError", err.data)}
        onRegisterLink={() => console.log("onRegisterLink")}
      />
    </ThemeTester>
  </EscolaLMSContextProvider>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
