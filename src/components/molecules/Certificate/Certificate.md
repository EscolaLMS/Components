```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Certificate.png";
import img2 from "./CertificateExample.png";

const props = {
  title: "Made in EU",
  description:
    "Wyróżnij się na tle innych, dzięki certyfikatowi potwierdzającemu wiedzę uzyskaną na szkoleniu.",
  handleDownload: () => {
    console.log("download");
  },
  handleShare: () => {
    console.log("share");
  },
};

<GlobalThemeProvider>
  <ThemeTester flexDirection="column" alignItems={"start"}>
    <div style={{ width: "100%" }}>
      <Certificate
        image={img2}
        title={props.title}
        description={props.description}
        handleDownload={props.handleDownload}
        handleShare={props.handleShare}
      />
    </div>
    <div style={{ width: "375px" }}>
      <Certificate
        mobile
        image={img2}
        title={props.title}
        description={props.description}
        handleDownload={props.handleDownload}
        handleShare={props.handleShare}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
