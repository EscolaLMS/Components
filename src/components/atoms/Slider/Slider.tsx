import * as React from "react";
import styled, { withTheme, css } from "styled-components";
import SlickSlider, { Settings } from "react-slick";
import { PropsWithChildren } from "react";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface StyledSliderProps {
  mobile?: boolean;
  borderRadius?: React.CSSProperties["borderRadius"];
}

export interface SliderProps
  extends StyledSliderProps,
    ExtendableStyledComponent {
  settings: Settings;
  dotsPosition?:
    | "top"
    | "top right"
    | "top left"
    | "bottom"
    | "bottom left"
    | "bottom right";
  children: React.ReactNode;
}

const StyledDiv = styled("div")<SliderProps>`
  .slick-slider {
    position: relative;

    display: block;
    box-sizing: border-box;

    user-select: none;

    -webkit-touch-callout: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;

    ${(props) => {
      if (!props.settings.dots) {
        return "";
      }
      switch (props.dotsPosition) {
        default:
        case "bottom":
        case "bottom left":
        case "bottom right":
          return css`
            margin-bottom: 30px;
          `;

        case "top":
        case "top left":
        case "top right":
          return css`
            margin-top: 36px;
          `;
      }
    }}
  }

  .slick-list {
    position: relative;

    display: block;
    overflow: hidden;

    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: none;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after {
    display: table;

    content: "";
  }
  .slick-track:after {
    clear: both;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list {
    transform: translate3d(0, 0, 0);
  }

  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slide {
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
  }
  [dir="rtl"] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-loading .slick-slide {
    visibility: hidden;
  }
  .slick-vertical .slick-slide {
    display: block;

    height: auto;

    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-loading .slick-list {
    background: #fff center center no-repeat;
  }

  /* Arrows */
  .slick-prev,
  .slick-next {
    font-size: 0;
    line-height: 0;

    position: absolute;
    top: 50%;

    display: block;

    width: 20px;
    height: 20px;
    padding: 0;
    transform: translate(0, -50%);

    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  }

  .slick-prev {
    left: -25px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px;
    line-height: 1;

    opacity: 0.75;
    color: white;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-prev:before {
    content: "←";
  }
  .slick-next {
    right: -25px;
  }
  .slick-next:before {
    content: "→";
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }
  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  }

  [dir="rtl"] .slick-prev {
    right: -25px;
    left: auto;
  }

  [dir="rtl"] .slick-prev:before {
    content: "→";
  }

  [dir="rtl"] .slick-next {
    right: auto;
    left: -25px;
  }

  [dir="rtl"] .slick-next:before {
    content: "←";
  }

  /* Dots */
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    position: absolute;
    ${(props) => {
      switch (props.dotsPosition) {
        default:
        case "bottom":
          return css`
            bottom: -30px;
            left: auto;
            width: 100%;
          `;
        case "bottom left":
          return css`
            bottom: -30px;
            left: 0px;
            width: auto;
          `;
        case "bottom right":
          return css`
            bottom: -30px;
            right: 0px;
            width: auto;
          `;

        case "top":
          return css`
            top: -40px;
            left: auto;
            width: 100%;
          `;
        case "top left":
          return css`
            top: -40px;
            left: 0px;
            width: auto;
          `;
        case "top right":
          return css`
            top: -40px;
            right: 0px;
            width: auto;
          `;
      }
    }}

    display: block;

    padding: 0;
    margin: 0;

    list-style: none;

    text-align: center;
  }
  .slick-dots li {
    position: relative;

    display: inline-block;

    width: ${(props) => (props.mobile ? "9px" : "13px")};
    height: ${(props) => (props.mobile ? "9px" : "13px")};
    margin: 0 4px;
    padding: 0;

    cursor: pointer;

    box-sizing: border-box;
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "50%"};
    border: 1px solid ${(props) => props.theme.gray3 || "#000000"};

    background: transparent;

    transition: background-color 0.5s;

    &:hover {
      border: 1px solid
        ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            "#000000"
          )};
      background: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          "#000000"
        )};
      opacity: 0.6;
    }

    &.slick-active {
      border: 1px solid
        ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            "#000000"
          )};
      background: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          "#000000"
        )};
    }
  }

  .slick-dots li button {
    font-size: 0;
    line-height: 0;

    display: block;
    border: none;
    appearance: none;

    width: 100%;
    height: 100%;
    padding: 0;

    cursor: pointer;

    color: transparent;
    outline: none;
    background: transparent;
  }
  .slick-dots li button:hover,
  .slick-dots li button:focus {
    outline: none;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before {
    opacity: 1;
  }
`;

export const Slider: React.FC<PropsWithChildren<SliderProps>> = (props) => {
  const { children, settings } = props;

  return (
    <StyledDiv
      {...props}
      className={`wellms-component ${props.className ?? ""}`}
    >
      <SlickSlider {...settings}>{children}</SlickSlider>
    </StyledDiv>
  );
};

export default withTheme(styled(Slider)<SliderProps>``);
