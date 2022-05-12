```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import IconText from "../../../components/atoms/IconText/IconText";
import img1 from "./CheckoutCard.png";
import img2 from "./CheckoutCardIllustration.png";

<GlobalThemeProvider>
  <ThemeTester flexDirection="column" alignItems={"start"}>
    <div style={{ width: "100%" }}>
      <CheckoutCard
        img={{
          src: img2,
          alt: "CheckoutCard",
          title: "CheckoutCard",
        }}
        title={"Księgowość dla początkujących"}
        subtitle={"5 lekcji"}
        price={"99,99 zł"}
        summary={[
          {
            type: "satisfaction",
            text: "99%",
          },
          {
            type: "guarantee",
            text: "Gwarancja",
          },
          {
            type: "rating",
            text: "4.5",
          },
        ]}
        oldPrice={"199,99 zł"}
        handleDelete={() => {
          console.log("delete");
        }}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
