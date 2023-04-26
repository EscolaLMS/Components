import React, { forwardRef } from "react";

import styled, { withTheme } from "styled-components";

import Image from "@escolalms/sdk/lib/react/components/Image";

interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  path: string;
  size?: number;
  srcSizes?: number[];
}

const StyledDiv = styled("div")`
  &,
  & > .escolalms-image,
  & > .escolalms-image img {
    width: 100%;
    max-width: 100%;
  }
`;

export const ResponsiveImage = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
    return (
      <StyledDiv className={`wellms-component ${props.className ?? ""}`}>
        <Image {...props} ref={ref} />
      </StyledDiv>
    );
  }
);

export default withTheme(styled(ResponsiveImage)``);
