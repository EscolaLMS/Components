```js
import { ThemeTester, ImageModal } from "../../../styleguide";
import { useState } from "react";

import { Text } from "../../../";
import img1 from "./Categories.png";
import img2 from "./Categories-2.png";
import json from "./mock.json";

const [selected, setSelected] = useState([4, 5]);

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Categories
        categories={json.data}
        label={"Czas trwania"}
        selectedCategories={selected}
        handleChange={(value) => {
          setSelected(value);
          console.log("selected", value);
        }}
      />
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
  <ImageModal images={[img1, img2]} />
</React.Fragment>;
```
