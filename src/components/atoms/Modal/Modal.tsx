import * as React from "react";
import styled, { createGlobalStyle, withTheme } from "styled-components";
import Dialog, { DialogProps } from "rc-dialog";
import chroma from "chroma-js";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface ModalProps extends DialogProps, ExtendableStyledComponent {}

const CloseBtn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g id="close" transform="translate(0 -0.005)">
      <g id="Group_68" data-name="Group 68" transform="translate(0 0.005)">
        <path
          id="Path_31"
          data-name="Path 31"
          d="M15.367,2.638a9,9,0,1,0,0,12.734A9.014,9.014,0,0,0,15.367,2.638Zm-2.653,9.02a.75.75,0,1,1-1.061,1.061L9,10.066,6.349,12.718a.75.75,0,0,1-1.061-1.061L7.939,9,5.287,6.352A.75.75,0,0,1,6.348,5.291L9,7.944l2.652-2.653a.75.75,0,0,1,1.061,1.061L10.061,9Z"
          transform="translate(0 -0.005)"
          fill="#afafaf"
        />
      </g>
    </g>
  </svg>
);

const StyledGlobal = createGlobalStyle<ModalProps>`
  .rc-dialog {
    position: relative;

    &-wrap {
      position: fixed;
      overflow: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1050;
      -webkit-overflow-scrolling: touch;
      outline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-title {
      margin: 0;
      font-size: 14px;
      line-height: 21px;
      font-weight: bold;
    }

    &-content {
      position: relative;
      background-color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.black, theme.white)};
      border: none;
      border-radius: ${({ theme }) => theme.modalRadius}px;
      background-clip: padding-box;
      width: 100%;
      max-width: ${(props) => (props.width ? props.width : "468px")};
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.1);
    }

    &-close {
      cursor: pointer;
      border: 0;
      background: transparent;
      font-size: 21px;
      position: absolute;
      right: 5px;
      top: 10px;
      font-weight: 700;
      line-height: 1;
      color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.black)};
      text-shadow: 0 1px 0 #fff;
      opacity: ${({ theme }) => (theme.mode === "light" ? 0.2 : 0.4)};
      text-decoration: none;

      svg path {
        fill: currentColor;
      }

      &-x:after {
        content: "×";
      }

      &:hover {
        opacity: 1;
        text-decoration: none;
      }
    }

    &-header {
      padding: 13px 20px 14px 20px;
      border-radius: 5px 5px 0 0;
      background: #fff;
      color: #666;
      border-bottom: 1px solid #e9e9e9;
    }

    &-body {
      padding: 35px;
    }

    &-footer {
      border-top: 1px solid #e9e9e9;
      padding: 10px 20px;
      text-align: right;
      border-radius: 0 0 5px 5px;
    }

    &-zoom-enter,
    &-zoom-appear {
      opacity: 0;
      animation-duration: 0.3s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      animation-play-state: paused;
    }

    &-zoom-leave {
      animation-duration: 0.3s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      animation-play-state: paused;
    }

    &-zoom-enter&-zoom-enter-active,
    &-zoom-appear&-zoom-appear-active {
      animation-name: rcDialogZoomIn;
      animation-play-state: running;
    }

    &-zoom-leave&-zoom-leave-active {
      animation-name: rcDialogZoomOut;
      animation-play-state: running;
    }

    @keyframes rcDialogZoomIn {
      0% {
        opacity: 0;
        transform: scale(0, 0);
      }
      100% {
        opacity: 1;
        transform: scale(1, 1);
      }
    }
    @keyframes rcDialogZoomOut {
      0% {
        transform: scale(1, 1);
      }
      100% {
        opacity: 0;
        transform: scale(0, 0);
      }
    }
    &-mask {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: ${({ theme }) =>
        chroma(theme.mode === "light" ? theme.white : theme.black)
          .alpha(0.7)
          .css()};
      height: 100%;
      z-index: 1050;

      &-hidden {
        display: none;
      }
    }

    &-fade-enter,
    &-fade-appear {
      opacity: 0;
      animation-duration: 0.3s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
      animation-play-state: paused;
    }

    &-fade-leave {
      animation-duration: 0.3s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
      animation-play-state: paused;
    }

    &-fade-enter&-fade-enter-active,
    &-fade-appear&-fade-appear-active {
      animation-name: rcDialogFadeIn;
      animation-play-state: running;
    }

    &-fade-leave&-fade-leave-active {
      animation-name: rcDialogFadeOut;
      animation-play-state: running;
    }

    @keyframes rcDialogFadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes rcDialogFadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .modal-title {
      margin-bottom: 30px;
      text-align: center;
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )};
        }
  }
`;

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, width, className = "" } = props;
  const wrapper = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <div ref={wrapper}>
        <Dialog
          {...props}
          closeIcon={<CloseBtn />}
          className={`wellms-component ${className}`}
        >
          <StyledGlobal width={width} />
          {children}
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default withTheme(styled(Modal)<ModalProps>``);
