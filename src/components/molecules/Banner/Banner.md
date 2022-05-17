```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Banner.png";
import img2 from "./BannerIllustration.png";

const BannerImg = () => {
  return <img src={img2} alt={"Banner Illustration"} className="banner-img" />;
};

const props = {
  background: "transparent",
  title: "My markdown text with some **bold**",
  btnText: "Sprawdź przycisk",
  handleBtn: () => {
    console.log("clicked");
  },
};

<GlobalThemeProvider>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Banner
        background={props.background}
        title={props.title}
        btnText={props.btnText}
        handleBtn={props.handleBtn}
        img={{
          src: img2,
          alt: "Banner Illustration",
        }}
      />
    </div>
    <div style={{ width: "375px" }}>
      <Banner
        mobile
        title={props.title}
        btnText={props.btnText}
        handleBtn={props.handleBtn}
        img={BannerImg()}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
