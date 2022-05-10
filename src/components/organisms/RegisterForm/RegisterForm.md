```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./LoginForm.png";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<GlobalThemeProvider>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <RegisterForm>
      <pre>This component is not ready yet</pre>
    </RegisterForm>
    <ImageModal images={[img1]} />
  </EscolaLMSContextProvider>
</GlobalThemeProvider>;
```
