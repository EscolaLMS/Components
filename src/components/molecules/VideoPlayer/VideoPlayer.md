```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./VideoPlayer.png";
import { Title, Text, Badge, Link } from "../../../";
import img2 from "./VideoPlayerPoster.png";

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <VideoPlayer
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        light={img2}
      ></VideoPlayer>
    </div>
    <div style={{ width: 375 }}>
      <VideoPlayer
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        light={img2}
        mobile
      ></VideoPlayer>
    </div>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
