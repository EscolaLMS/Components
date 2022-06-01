```jsx
import { ImageModal, ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
  <ThemeTester flexDirection="column">
    <SearchAutocomplete
      onItemSelected={(item) => console.log("item selected", item)}
      onInputSubmitted={(input) => console.log("submitted", input)}
    />
  </ThemeTester>
</EscolaLMSContextProvider>;
```
