```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Banner.png";
import img2 from "./BannerIllustration.png";

const props = {
  text: "My markdown text with some **bold**",
  btnText: "Sprawdź przycisk",
  handleBtn: () => {
    console.log("clicked");
  },
  img: {
    src: img2,
    alt: "Banner illustration",
    title: "Banner title",
  },
};

<GlobalThemeProvider>
  <div style={{ width: "100%" }}>
    <Banner {...props} />
  </div>
  <div style={{ width: "576px" }}>
    <Banner mobile {...props} />
  </div>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
