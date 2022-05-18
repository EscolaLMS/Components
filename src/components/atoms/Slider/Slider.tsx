import styled, { withTheme, css } from "styled-components";
import SlickSlider, { Settings } from "react-slick";

export interface SliderProps {
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

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
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

  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
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

  // theme

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
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);

    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    background: transparent;
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

  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 20px;
    line-height: 1;

    opacity: 0.75;
    color: white;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev {
    left: -25px;
  }
  [dir="rtl"] .slick-prev {
    right: -25px;
    left: auto;
  }
  .slick-prev:before {
    content: "←";
  }
  [dir="rtl"] .slick-prev:before {
    content: "→";
  }

  .slick-next {
    right: -25px;
  }
  [dir="rtl"] .slick-next {
    right: auto;
    left: -25px;
  }
  .slick-next:before {
    content: "→";
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

    width: 13px;
    height: 13px;
    margin: 0 4px;
    padding: 0;

    cursor: pointer;

    box-sizing: border-box;
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.gray3 || "#000000"};

    background: transparent;

    transition: background-color 0.5s;

    &:hover {
      border: 1px solid ${(props) => props.theme.primaryColor || "#000000"};
      background: ${(props) => props.theme.primaryColor || "#000000"};
      opacity: 0.6;
    }

    &.slick-active {
      border: 1px solid ${(props) => props.theme.primaryColor || "#000000"};
      background: ${(props) => props.theme.primaryColor || "#000000"};
    }
  }

  .slick-dots li button {
    font-size: 0;
    line-height: 0;

    display: block;
    border: none;
    background: none;
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

export const Slider: React.FC<SliderProps> = (props) => {
  const { children, settings, dotsPosition = "top" } = props;

  return (
    <StyledDiv {...props}>
      <SlickSlider {...settings}>{children}</SlickSlider>
    </StyledDiv>
  );
};

export default withTheme(styled(Slider)<SliderProps>``);
