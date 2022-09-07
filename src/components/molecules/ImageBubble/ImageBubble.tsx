import * as React from "react";

import styled, { withTheme } from "styled-components";
import { RatioBox } from "../../../index";

interface ImageBubbleImgProps {
  src: string;
  alt: string;
}

export interface ImageBubbleProps {
  ratio?: number;
  children: React.ReactNode;
  header?: React.ReactNode;
  image: ImageBubbleImgProps | React.ReactNode;
}

const StyledDiv = styled("div")<ImageBubbleProps>`
  border-radius: ${(props) => props.theme?.cardRadius || 0}px;
  overflow: hidden;
  position: relative;
  .children-list {
    padding: 0;
    margin: 0;
    position: absolute;
    left: 10px;
    top: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: flex-end;
  }
`;

export const ImageBubble: React.FC<ImageBubbleProps> = ({ ...props }) => {
  const { children, image, ratio = 1, header } = props;
  return (
    <StyledDiv className="wellms-component" {...props}>
      <RatioBox ratio={ratio}>
        {React.isValidElement(image) ? (
          <React.Fragment>{image}</React.Fragment>
        ) : (
          <img
            className={"banner-img"}
            src={(image as ImageBubbleImgProps).src}
            alt={(image as ImageBubbleImgProps).alt}
          />
        )}
      </RatioBox>
      <div className="children-list">
        <div className="children-list__header">{header || " "}</div>
        <div className="children-list__items">{children}</div>
      </div>
    </StyledDiv>
  );
};

// Main button with styles
export default withTheme(styled(ImageBubble)<ImageBubbleProps>``);
