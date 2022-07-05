```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import { Button, Title, Text } from "../../..";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester flexDirection="column">
      <div style={{ marginBottom: 30, width: "100%" }}>
        <Title level={4}>Essay</Title>
        <H5Player onXAPI={(e) => console.log(e)} id={"74"} />
      </div>
      <div style={{ marginBottom: 30, width: "100%" }}>
        <Title level={4}>Dialog Cards</Title>
        <H5Player onXAPI={(e) => console.log(e)} id={"7"} />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
