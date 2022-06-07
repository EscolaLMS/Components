```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester>
      <H5P onXAPI={(e) => console.log(e)} id={"4"} />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
