```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Banner.png";
import img2 from "./BannerIllustration.png";

const BannerImg = () => {
  return <img src={img2} className="banner-img" />;
};

const props = {
  text: "My markdown text with some **bold**",
  btnText: "Sprawdź przycisk",
  handleBtn: () => {
    console.log("clicked");
  },
};

<GlobalThemeProvider>
  <div style={{ width: "100%" }}>
    <Banner
      text={props.text}
      btnText={props.btnText}
      handleBtn={props.handleBtn}
      img={{
        src: img2,
        alt: "Banner illustration",
        title: "Banner title",
      }}
    />
  </div>
  <div style={{ width: "576px" }}>
    <Banner
      mobile
      text={props.text}
      btnText={props.btnText}
      handleBtn={props.handleBtn}
      img={BannerImg()}
    />
  </div>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
