```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Categories.png";
import img2 from "./Categories-2.png";
import json from "./mock.json";

<GlobalThemeProvider>
  <Categories categories={json.data} onChange={(val) => console.log(val)} />
  <ImageModal images={[img1, img2]} />
</GlobalThemeProvider>;
```
