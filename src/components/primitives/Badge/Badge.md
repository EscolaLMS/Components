```js
import { DefaultTheme, ThemeProvider } from "styled-components";
import themes from "../../../theme";
import Title from "../Typography/Title";
import img1 from "./Badge.png";
import ImageModal from "../../../styleguide/ImageModal";

<React.Fragment>
  <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
    {Object.entries(themes).map((theme) => (
      <ThemeProvider theme={theme[1]} key={theme[0]}>
        <Badge style={{ marginRight: "10px" }}>Bestseller {theme[0]}</Badge>{" "}
      </ThemeProvider>
    ))}
  </div>{" "}
  <div style={{ background: "#E4E4E4", padding: "25px", margin: "12px" }}>
    {" "}
    <Badge color="#ff0000" style={{ marginRight: "10px" }}>
      custom color Badge
    </Badge> <Badge style={{ marginRight: "10px" }} color="#00ff00">
      custom color Badge
    </Badge> <Badge color="#0000ff">custom color Badge</Badge>{" "}
  </div>{" "}
  <ImageModal images={[img1]} />
</React.Fragment>;
```

### Custom theme badge

```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Badge.png";

<GlobalThemeProvider>
  <Badge>Bestseller</Badge>
  <br />
  <br />
  <br />
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
