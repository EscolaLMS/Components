import * as React from "react";
import { useCallback } from "react";
import Lightbox from "react-image-lightbox";
import styled, { withTheme } from "styled-components";
import Image from "@escolalms/sdk/lib/react/components/Image";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import "react-image-lightbox/style.css";

const StyledImagePlayer = styled("div")`
  .escolalms-image {
    cursor: pointer;

    &:hover {
      img {
        transform: scale(1.02);
      }
    }
    img {
      width: 100%;
      transition: transform 0.5s ease-out;
    }
  }
`;

interface ImagePlayerProps {
  topic: API.TopicImage;
  onLoad: () => void;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({ topic, onLoad }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const onCloseRequest = useCallback(() => setOpen(false), []);
  const { apiUrl } = React.useContext(EscolaLMSContext);

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <StyledImagePlayer>
      <Image
        path={topic.topicable.value}
        srcSizes={[500, 750, 1000]}
        onClick={() => setOpen(true)}
      />
      {open && (
        <Lightbox
          wrapperClassName=""
          mainSrc={`${apiUrl}/api/images/img?path=${topic.topicable.value}`}
          onCloseRequest={onCloseRequest}
        />
      )}
    </StyledImagePlayer>
  );
};

export default withTheme(styled(ImagePlayer)<ImagePlayerProps>``);
