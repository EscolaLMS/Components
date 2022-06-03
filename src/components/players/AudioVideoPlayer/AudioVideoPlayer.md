```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./VideoPlayer.png";
import { Title, Text, Badge, Link } from "../../../";
import img2 from "./VideoPlayerPoster.png";

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <AudioVideoPlayer
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        light={img2}
      >
        <div className="video-player-overlay">
          <div className="video-player-overlay-inner">
            <Badge
              style={{
                marginRight: 10,
              }}
            >
              Nowość
            </Badge>
            <div className="video-player-breadcrumbs">
              <Link href="http://onet.pl" target="_blank">
                Onet
              </Link>
              <Link href="http://onet.pl" target="_blank">
                Onet
              </Link>
            </div>
            <Title level={3}>Video Example</Title>
            <div className="video-player-footer">
              <Text size={"12"} noMargin>
                27/05/2020
              </Text>
              <Text size={"12"} noMargin>
                3.33 min
              </Text>
            </div>
          </div>
        </div>
      </AudioVideoPlayer>
    </div>
    <div style={{ width: 375 }}>
      <AudioVideoPlayer
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        light={img2}
        mobile
      ></AudioVideoPlayer>
    </div>
    <div style={{ width: "100%" }}>
      <Title level={3}>Audio</Title>
      <AudioVideoPlayer
        url="http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
        light={img2}
        audio={true}
      >
        <div className="video-player-overlay">
          <div className="video-player-overlay-inner">
            <Badge
              style={{
                marginRight: 10,
              }}
            >
              Nowość
            </Badge>
            <div className="video-player-breadcrumbs">
              <Link href="http://onet.pl" target="_blank">
                Onet
              </Link>
              <Link href="http://onet.pl" target="_blank">
                Onet
              </Link>
            </div>
            <Title level={3}>Audio Example</Title>
            <div className="video-player-footer">
              <Text size={"12"} noMargin>
                27/05/2020
              </Text>
              <Text size={"12"} noMargin>
                3.33 min
              </Text>
            </div>
          </div>
        </div>
      </AudioVideoPlayer>
    </div>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
