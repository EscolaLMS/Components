import * as React from "react";
import { useCallback } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import styled, { withTheme, createGlobalStyle } from "styled-components";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { SharedLightboxStyle } from "../../../utils/utils";
import { ResponsiveImage } from "../../organisms/ResponsiveImage/ResponsiveImage";
import { ExtendableStyledComponent } from "types/component";

const StyledImagePlayer = styled("div")`
  > div {
    cursor: pointer;

    img {
      width: 100%;
      transition: transform 0.5s ease-out;
    }
    &:hover {
      img {
        transform: scale(1.02);
      }
    }
  }
`;

const LightBoxOverwrite = createGlobalStyle`
${SharedLightboxStyle}
`;

interface ImagePlayerProps extends ExtendableStyledComponent {
  topic: API.TopicImage;
  onLoad: () => void;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({
  topic,
  onLoad,
  className = "",
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const onCloseRequest = useCallback(() => setOpen(false), []);
  const { apiUrl } = React.useContext(EscolaLMSContext);

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <StyledImagePlayer className={`wellms-component ${className}`}>
      <ResponsiveImage
        path={topic.topicable.value}
        srcSizes={[500, 750, 1000]}
        onClick={() => setOpen(true)}
      />
      {open && (
        <>
          <LightBoxOverwrite />
          <Lightbox
            open={open}
            zoom={{ maxZoomPixelRatio: 4 }}
            slides={[
              { src: `${apiUrl}/api/images/img?path=${topic.topicable.value}` },
            ]}
            plugins={[Zoom]}
            close={onCloseRequest}
          />
        </>
      )}
    </StyledImagePlayer>
  );
};

export default withTheme(styled(ImagePlayer)<ImagePlayerProps>``);
