```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Avatar.png";
import img2 from "./AvatarExample.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Avatar src={img2} alt={"custom alt"} size={"extraLarge"} />
    <Avatar src={img2} alt={"custom alt"} size={"large"} />
    <Avatar src={img2} alt={"custom alt"} />
    <Avatar src={img2} alt={"custom alt"} size={"small"} />
    <Avatar src={img2} alt={"custom alt"} size={"extraSmall"} />
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
