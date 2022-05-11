```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Banner.png";
import img2 from "./BannerIllustration.png";

<GlobalThemeProvider>
  <div style={{ width: "100%" }}>
    <Banner
      text={"My markdown text with some **bold**"}
      btnText={"Sprawdź przycisk"}
      handleBtn={() => {
        console.log("clicked");
      }}
      img={{
        src: img2,
        alt: "Custom Alt",
        title: "Custom Title",
      }}
    />
  </div>
  <div style={{ width: "576px" }}>
    <Banner
      mobile={true}
      text={"My markdown text with some **bold**"}
      btnText={"Sprawdź przycisk"}
      handleBtn={() => {
        console.log("clicked");
      }}
      img={{
        src: img2,
        alt: "Custom Alt",
        title: "Custom Title",
      }}
    />
  </div>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
