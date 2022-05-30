```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import Authbtn from "../../../utils/components/authbtn";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester>
      <PdfPlayer
        url="https://s2.q4cdn.com/498544986/files/doc_downloads/test.pdf"
        onLoad={() => console.log("load")}
      />
      <PdfPlayer
        url="https://api-stage.escolalms.com//storage/chapter-04-maintenance.pdf"
        onLoad={() => console.log("load")}
      />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
