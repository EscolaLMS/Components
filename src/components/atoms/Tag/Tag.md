```js
import { ThemeTester, ImageModal } from "../../../styleguide";
import img1 from "./Tags.png";

<>
  <ThemeTester>
    <Tag>tag1</Tag>
    <Tag>bestseller</Tag>
    <Tag>nowość</Tag>
    <Tag onClick={() => console.log("click")}>Clickable tag</Tag>
  </ThemeTester>
  <ImageModal images={[img1]} />
</>;
```
