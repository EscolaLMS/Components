```js
import { ThemeTester, ImageModal } from "../../../styleguide";
import { useState } from "react";

import { Text, Dropdown } from "../../../";
import { Row, Col } from "react-grid-system";
import json from "./mock.json";

const [selected, setSelected] = useState([
  {
    id: 1,
    title: "Animacja",
  },
  {
    id: 4,
    title: "Finances",
  },
]);

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Row>
        <Col>
          <Tags
            tags={json.data}
            label={"Tagi"}
            selectedTags={selected}
            handleChange={(value) => {
              setSelected(value);
              console.log("selected", value);
            }}
          />
        </Col>
      </Row>
    </div>
    <div style={{ width: 375 }}>
      <Tags
        mobile
        tags={json.data}
        label={"Czas trwania"}
        selectedTags={selected}
        drawerTitle={
          <Text noMargin size={"14"} bold>
            Filtry
          </Text>
        }
        drawerButtonText={"Pokaż wyniki"}
        handleChange={(value) => {
          setSelected(value);
          console.log("selected", value);
        }}
        handleDrawerButtonClick={() => console.log("click")}
      />
    </div>
  </ThemeTester>
</React.Fragment>;
```
