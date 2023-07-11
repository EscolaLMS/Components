```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import Authbtn from "../../../utils/components/authbtn";
import { Text } from "../../../";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester>
      <PdfPlayer
        url="https://s2.q4cdn.com/498544986/files/doc_downloads/test.pdf"
        onLoad={() => console.log("load")}
      />

      <div style={{ display: "block", width: "100%" }}>
        <Text>With pagination</Text>
      </div>

      <PdfPlayer
        url="https://api-stage.escolalms.com//storage/chapter-04-maintenance.pdf"
        onLoad={() => console.log("load")}
        onTopicEnd={() => console.log("Action on topic end")}
      />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
