```js
import { useState } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";
import { Button, Title, Text } from "../../..";

const ids = [
  {
    name: "Essey",
    id: 74,
  },
  {
    name: "Dialog Cards",
    id: 8,
  },
  {
    name: "Crossword",
    id: 7,
  },
  {
    name: "Image Juxtaposition",
    id: 86,
  },
  {
    name: "Guess the Answer",
    id: 221,
  },
  {
    name: "Questionnaire",
    id: 123,
  },
  {
    name: "True/false",
    id: 30,
  },
  {
    name: "Multiple choice",
    id: 32,
  },
  {
    name: "Single choice",
    id: 31,
  },
  {
    name: "Agamotto",
    id: 28,
  },
  {
    name: "Image Hotspots",
    id: 223,
  },
  {
    name: "Image Slider",
    id: 224,
  },
  {
    name: "Collage",
    id: 6,
  },
];

const [id, setId] = useState(ids[0].id);

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <select onChange={(e) => setId(Number(e.target.value))} value={id}>
      {ids.map((idd) => (
        <option key={idd.id} value={idd.id}>
          {idd.id} {idd.name}
        </option>
      ))}
    </select>
    <ThemeTester flexDirection="column">
      <div style={{ marginBottom: 30, width: "100%" }}>
        <Title level={4}>{ids.find((idd) => idd.id === id).name}</Title>
        <H5Player key={id} onXAPI={(e) => console.log(e)} id={id} />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
