```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import Authbtn from "../../../utils/components/authbtn";
import h5pObject from "./h5pObject.ts";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <Authbtn />
    <ThemeTester>
      <H5Player onXAPI={(e) => console.log(e)} id={"4"} />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
