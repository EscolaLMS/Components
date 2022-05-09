```js
import img1 from "./LoginForm.png";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester>
      <LoginForm />
    </ThemeTester>
  </EscolaLMSContextProvider>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
