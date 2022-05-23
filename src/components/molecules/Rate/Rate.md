```js
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./rate1.png";
import img2 from "./rate2.png";

<ThemeTester childrenListStyle={{ display: "block" }}>
  <Rate onSubmit={(rate) => console.log("Rate: ", rate)} />
  <ImageModal images={[img1, img2]} />
</ThemeTester>;
```
