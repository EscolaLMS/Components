```js
import { ThemeTester, ImageModal } from "../../../styleguide";
import img1 from "./Categories.png";
import img2 from "./Categories-2.png";
import json from "./mock.json";

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%", display: "flex" }}>
      <Categories categories={json.data} label={"Długość trwania"} />
      <Categories categories={json.data} label={"Długość trwania"} />
      <Categories categories={json.data} label={"Długość trwania"} />
    </div>
    <div style={{ width: 375 }}>
      <Categories
        categories={json.data}
        label={"Długość trwania"}
        mobile={true}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1, img2]} />
</React.Fragment>;
```
