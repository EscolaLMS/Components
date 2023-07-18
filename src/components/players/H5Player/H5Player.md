```js
import { useState, useEffect } from "react";
import { GlobalThemeProvider } from "../../../theme/provider";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { getH5p } from "@escolalms/sdk/lib/services/h5p";

import ThemeTester from "../../../styleguide/ThemeTester";
import { Title } from "../../..";

const ids = [
  {
    name: "Accordion",
    id: 1,
    uuid: "96eea0b3-fdc4-4f9c-b227-357c8687c65a",
  },
  {
    name: "Essey",
    id: 74,
    uuid: "96eea477-9e60-46f5-b4ef-28baaede0cef",
  },
  {
    name: "Dialog Cards",
    id: 8,
    uuid: "96eea0b4-1095-4ab2-9af8-a85be47dd579",
  },
  {
    name: "Crossword",
    id: 7,
    uuid: "96eea0b4-0f23-48b8-8159-4c5c1de741f1",
  },
  {
    name: "Image Juxtaposition",
    id: 86,
    uuid: "96eea476-e790-4162-918e-2050cc497e98",
  },
  {
    name: "Guess the Answer",
    id: 221,
    uuid: "96eea477-bccc-45f9-869a-21b518158279",
  },
  {
    name: "Questionnaire",
    id: 123,
    uuid: "96eea477-d11b-4985-bca9-088ba2070dc8",
  },
  {
    name: "True/false",
    id: 30,
    uuid: "96eea477-8d22-4d55-867d-a9c213af4aff",
  },
  {
    name: "Multiple choice",
    id: 32,
    uuid: "96eea477-e318-4308-af1b-c64a28b5deee",
  },
  {
    name: "Single choice",
    id: 31,
    uuid: "96eea476-f1ff-4960-9190-e1dee65a5b33",
  },
  {
    name: "Agamotto",
    id: 28,
    uuid: "96eea477-933e-4ba8-a379-5f66d8231e26",
  },
  {
    name: "Image Hotspots",
    id: 223,
    uuid: "96eea477-b80d-497a-b5d7-38c19d32d2ce",
  },
  {
    name: "Image Slider",
    id: 224,
    uuid: "96eea477-dea1-4ea5-ab18-442758052015",
  },
  {
    name: "Collage",
    id: 6,
    uuid: "96eea0b4-0d60-4772-83e3-c633807f37b9",
  },
  {
    name: "Memory Game",
    id: 335,
    uuid: "96eea477-1ad4-4d18-a5de-a649a2518468",
  },
  {
    name: "Find the hotspot",
    id: 910,
    uuid: "96eea476-86bf-4422-b4da-71a9c7c7c94e",
  },
  {
    name: "Drag the words",
    id: 906,
    uuid: "96eea477-8868-4ed0-9822-432f0a241c71",
  },
];

const [uuid, setUuid] = useState(ids[0].uuid);

const [fetchInComponent, setFetchInComponent] = useState(true);

const [playerProps, setPlayerProps] = useState();

useEffect(() => {
  if (fetchInComponent) {
    setPlayerProps({
      uuid: uuid,
      loading: false,
    });
  } else {
    setPlayerProps({
      loading: true,
    });
    getH5p("https://api-stage.escolalms.com/", uuid).then((data) => {
      setPlayerProps({
        state: data.data,
        loading: false,
      });
    });
  }
}, [uuid, fetchInComponent]);

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <div>
      <select onChange={(e) => setUuid(e.target.value)} value={uuid}>
        {ids.map((idd) => (
          <option key={idd.uuid} value={idd.uuid}>
            {idd.id} {idd.name}
          </option>
        ))}
      </select>
      <label>
        Fetch In Component
        <input
          type="checkbox"
          checked={fetchInComponent}
          onChange={(e) => setFetchInComponent(e.target.checked)}
        />
      </label>
    </div>
    <ThemeTester flexDirection="column">
      <div style={{ marginBottom: 30, width: "100%" }}>
        <Title level={4}>{ids.find((idd) => idd.uuid === uuid).name}</Title>
        <H5Player
          key={uuid}
          onXAPI={(e) => console.log("onXAPI ", e)}
          onTopicEnd={() => console.log("H5P progress")}
          {...playerProps}
        />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
