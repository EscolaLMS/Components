```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./ProfileAvatar.png";
import img2 from "./ProfileAvatarExample.png";

<GlobalThemeProvider>
  <ProfileAvatar src={img2} alt={"custom alt"} size={"extraLarge"} />
  <ProfileAvatar src={img2} alt={"custom alt"} size={"large"} />
  <ProfileAvatar src={img2} alt={"custom alt"} />
    <ProfileAvatar src={img2} alt={"custom alt"} size={"small"} />
    <ProfileAvatar src={img2} alt={"custom alt"} size={"extraSmall"} />
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
