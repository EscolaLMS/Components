```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";

import ThemeTester from "../../../styleguide/ThemeTester";
import Authbtn from "../../../utils/components/authbtn";

<React.Fragment>
  <ThemeTester>
    <AudioPlayer
      url="https://api-stage.escolalms.com//storage/course/7/topic/736/audio/siwCEwd14f7mPtY1rmfxcYovSTF73wKN1Sx3F7SL.mp4"
      onFinish={() => console.log("finish")}
    />
    <AudioPlayer onFinish={() => console.log("finish")} />
  </ThemeTester>
</React.Fragment>;
```
