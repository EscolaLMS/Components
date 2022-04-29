```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./ProfileAvatar.png";
import img2 from "./ProfileAvatarExample.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <ProfileAvatar src={img2} alt={"custom alt"} size={"extraLarge"} />
    <ProfileAvatar src={img2} alt={"custom alt"} size={"large"} />
    <ProfileAvatar src={img2} alt={"custom alt"} />
      <ProfileAvatar src={img2} alt={"custom alt"} size={"small"} />
      <ProfileAvatar src={img2} alt={"custom alt"} size={"extraSmall"} />
  </ThemeTester>
    
  <ImageModal images={[img1]} />
</React.Fragment>;
```
