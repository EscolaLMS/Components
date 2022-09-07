import * as React from "react";
import Embed, { EmbedProps } from "react-tiny-oembed";
import styled, { withTheme } from "styled-components";
import { RatioBox } from "../../../";

export interface OEmbedPlayerProps extends EmbedProps {
  ratio?: number;
}

const StyledOEmbedPlayer = styled("div")`
  width: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }

  .__embed {
    width: 100%;
    max-width: 100%;
  }

  .__embed_column {
    display: block;
    height: 100%;
  }
`;

export const OEmbedPlayer: React.FC<OEmbedPlayerProps> = (props) => {
  const { ratio = 9 / 16 } = props;

  return (
    <StyledOEmbedPlayer className="wellms-component">
      <RatioBox ratio={ratio}>
        <Embed {...props} />
      </RatioBox>
    </StyledOEmbedPlayer>
  );
};

export default withTheme(styled(OEmbedPlayer)<OEmbedPlayerProps>``);
