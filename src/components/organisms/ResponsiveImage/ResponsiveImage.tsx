import * as React from "react";

import styled, { withTheme } from "styled-components";

import Image from "@escolalms/sdk/lib/react/components/Image";

type ImageProps = {
  path: string;
  size?: number;
  srcSizes?: number[];
  alt?: string;
};

const StyledDiv = styled("div")`
  &,
  & > .escolalms-image,
  & > .escolalms-image img {
    width: 100%;
    max-width: 100%;
  }
`;

export const ResponsiveImage: React.FC<ImageProps> = (props) => {
  return (
    <StyledDiv>
      <Image {...props} />
    </StyledDiv>
  );
};

export default withTheme(styled(ResponsiveImage)``);
