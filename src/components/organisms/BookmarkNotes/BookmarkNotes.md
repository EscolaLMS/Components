```jsx
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../../styleguide";
import { Button } from "../../..";

<ThemeTester>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <BookmarkNotes onClickBookmark={() => console.log("click")} />
  </EscolaLMSContextProvider>
</ThemeTester>;
```
