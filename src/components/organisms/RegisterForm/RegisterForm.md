```js
import img1 from "./LoginForm.png";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text } from "../../../";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <RegisterForm />
    </ThemeTester>
  </EscolaLMSContextProvider>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
