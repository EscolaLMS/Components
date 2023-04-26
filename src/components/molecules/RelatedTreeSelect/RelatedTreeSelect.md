```js
import { useState } from "react";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text, Stack } from "../../../";
import ThemeTester from "../../../styleguide/ThemeTester";

const [selected, setSelected] = useState("");

<ThemeTester>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <Stack $gap={15}>
      <Text>Selected value: {selected}</Text>
      <RelatedTreeSelect onChange={(v) => setSelected(v)} />
    </Stack>
  </EscolaLMSContextProvider>
</ThemeTester>;
```
