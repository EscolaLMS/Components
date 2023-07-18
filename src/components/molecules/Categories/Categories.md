```js
import { ThemeTester } from "../../../styleguide";
import { useState } from "react";

import { Text, Dropdown } from "../../../";
import { Row, Col } from "react-grid-system";
import json from "./mock.json";

const [selected, setSelected] = useState([4, 5]);

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Row>
        <Col>
          <Categories
            categories={json.data}
            label={"Czas trwania"}
            selectedCategories={selected}
            handleChange={(value) => {
              setSelected(value);
              console.log("selected", value);
            }}
          />
        </Col>
      </Row>
    </div>
    <div style={{ width: 375 }}>
      <Categories
        mobile
        categories={json.data}
        label={"Czas trwania"}
        selectedCategories={selected}
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
