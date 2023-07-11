```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Certificate.png";
import img2 from "./CertificateExample.png";

const CertificateImg = () => {
  return <img src={img2} alt={"certificate"} />;
};

const props = {
  img: {
    src: img2,
    alt: "Certificate",
  },
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
        img={{
          src: props.img.src,
          alt: props.img.alt,
        }}
        title={props.title}
        description={props.description}
        handleDownload={props.handleDownload}
        handleShare={props.handleShare}
      />
    </div>
    <div style={{ width: "375px" }}>
      <Certificate
        mobile
        img={CertificateImg()}
        title={props.title}
        description={props.description}
        handleDownload={props.handleDownload}
        handleShare={props.handleShare}
      />
    </div>
  </ThemeTester>
</GlobalThemeProvider>;
```
