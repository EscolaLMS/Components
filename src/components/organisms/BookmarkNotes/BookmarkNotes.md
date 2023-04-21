```jsx
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../../styleguide";
import { Button } from "../../..";

<ThemeTester>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <BookmarkNotes
      closeButton={<Button mode="secondary">Close</Button>}
      onClickBookmark={() => console.log("click")}
    />
  </EscolaLMSContextProvider>
</ThemeTester>;
```
