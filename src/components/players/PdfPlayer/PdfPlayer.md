```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import Authbtn from "../../../utils/components/authbtn";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester>
      <PdfPlayer />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
