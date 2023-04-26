import React, { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import styled, { withTheme, createGlobalStyle } from "styled-components";
import { API } from "@escolalms/sdk/lib";
import { ExtendableStyledComponent } from "types/component";
import { SharedLightboxStyle } from "../../../utils/utils";
import { ResponsiveImage } from "../../organisms/ResponsiveImage/ResponsiveImage";

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
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <Gallery
        options={{
          arrowPrev: false,
          arrowNext: false,
          imageClickAction: "zoom",
          initialZoomLevel: "fit",
          secondaryZoomLevel: 2,
          maxZoomLevel: 3,
        }}
      >
        <LightBoxOverwrite />
        <StyledImagePlayer className={`wellms-component ${className}`}>
          <Item
            original={imgSrc}
            width={topic.topicable.width}
            height={topic.topicable.height}
            alt={`LMS Image ${topic.topicable.id}`}
          >
            {({ ref, open }) => (
              <ResponsiveImage
                path={topic.topicable.value}
                onClick={open}
                onLoad={(e) => setImgSrc(e.currentTarget.currentSrc)}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                srcSizes={[500, 750, 1000]}
              />
            )}
          </Item>
        </StyledImagePlayer>
      </Gallery>
    </>
  );
};

export default withTheme(styled(ImagePlayer)<ImagePlayerProps>``);
