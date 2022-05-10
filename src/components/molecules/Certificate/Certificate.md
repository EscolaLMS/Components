```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Certificate.png";
import img2 from "./CertificateExample.png";

<GlobalThemeProvider>
  <ThemeTester flexDirection="column" alignItems={"start"}>
    <Certificate
      image={img2}
      title={"Made in EU"}
      description={
        "Wyróżnij się na tle innych, dzięki certyfikatowi potwierdzającemu wiedzę uzyskaną na szkoleniu."
      }
      downloadUrl={"#"}
      shareUrl={"#"}
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
