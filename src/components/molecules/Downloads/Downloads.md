### Default theme

```js
import { ThemeProvider } from "styled-components";
import themes from "../../../theme";
import Title from "../../atoms/Typography/Title";
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import Download from "../../atoms/Download/Download";
import img1 from "./Downloads.png";

<React.Fragment>
  <ThemeTester flexDirection={"column"}>
    <Downloads
      title={"Downloads"}
      subtitle={"Subtitle"}
      downloads={[
          {
              href: "https://www.google.com",
          },
          {
              fileName: "File name",
              href: "https://www.google.com",
          },
          {
              fileName: "File name",
              href: "https://www.google.com",
          },
          {
              href: "https://www.google.com",
          },
          {
              fileName: "File name",
              href: "https://www.google.com",
          },
          {
              fileName: "File name",
              href: "https://www.google.com",
          }
      ]}
    />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
