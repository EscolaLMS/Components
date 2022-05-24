```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./LoginForm.png";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<GlobalThemeProvider>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ResetPasswordForm
      onSuccess={() => console.log("onSuccess")}
      onError={(err) => console.log("onError", err.data)}
      backToLogin={() => console.log("backToLogin")}
      onRegisterLink={() => console.log("onRegisterLink")}
      return_url={"reset"}
    >
      <pre>This component is not ready yet</pre>
    </ResetPasswordForm>{" "}
  </EscolaLMSContextProvider>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
