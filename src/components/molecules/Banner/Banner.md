```js
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Banner.png";
import img2 from "./BannerIllustration.png";
import img3 from "./VideoPlayerPoster.png";
import { MarkdownRenderer } from "../../molecules/MarkdownRenderer/MarkdownRenderer";
import { Title } from "../../atoms/Typography/Title";
import { AudioVideoPlayer } from "../../players/AudioVideoPlayer/AudioVideoPlayer";
import { ResponsiveImage } from "../../organisms/ResponsiveImage/ResponsiveImage";
import Image from "@escolalms/sdk/lib/react/components/Image";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

const props = {
  background: "transparent",
  btnText: "Sprawdź przycisk",
  handleBtn: () => {
    console.log("clicked");
  },
};

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Banner
        background={props.background}
        title={<MarkdownRenderer children={"# My title with **bold font**"} />}
        btnText={props.btnText}
        handleBtn={props.handleBtn}
        asset={
          <AudioVideoPlayer
            url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            light={img3}
            ratio={1}
          ></AudioVideoPlayer>
        }
      />
    </div>
    <div style={{ width: "100%" }}>
      <Banner
        reverse
        background={props.background}
        title={<MarkdownRenderer children={"# My title with **bold font**"} />}
        btnText={props.btnText}
        handleBtn={props.handleBtn}
        asset={
          <AudioVideoPlayer
            url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            light={img3}
            ratio={1}
          ></AudioVideoPlayer>
        }
      />
    </div>
    <div style={{ width: 375 }}>
      <Banner
        mobile
        asset={
          <EscolaLMSContextProvider
            apiUrl="https://api.sa.etd24.pl"
            imagePrefix="https://startup-academy-stage.s3.eu-central-1.amazonaws.com"
          >
            <ResponsiveImage
              path={
                "course/7/topic/737/image/I43KisiNXzAoZNyx7q9ddfHcdVXaC6fYTfrElUW9.jpg"
              }
              srcSizes={[500, 750, 1000]}
            />
          </EscolaLMSContextProvider>
        }
        title={
          <MarkdownRenderer children={"# My title with **bold font**"} mobile />
        }
        btnText={props.btnText}
        handleBtn={props.handleBtn}
      />
    </div>
    <div style={{ width: 375 }}>
      <Banner
        mobile
        background={props.background}
        title={
          <MarkdownRenderer children={"# My title with **bold font**"} mobile />
        }
        btnText={props.btnText}
        handleBtn={props.handleBtn}
        asset={
          <AudioVideoPlayer
            url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            light={img3}
            ratio={1}
          ></AudioVideoPlayer>
        }
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
