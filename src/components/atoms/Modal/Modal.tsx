import * as React from "react";

import styled, { withTheme, createGlobalStyle } from "styled-components";

import Dialog, { DialogProps } from "rc-dialog";

export interface ModalProps extends DialogProps {}

const CloseBtn = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
      fill="#4A4A4A"
    />
  </svg>
);

const GlobalStyle = createGlobalStyle`
  .rc-dialog {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;

    height: 100%;

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
    }

    &-title {
      margin: 0;
      font-size: 14px;
      line-height: 21px;
      font-weight: bold;
    }

    &-content {
      position: relative;
      background-color: #ffffff;
      border: none;
      border-radius: 6px 6px;
      background-clip: padding-box;
    }

    &-close {
      cursor: pointer;
      border: 0;
      background: transparent;
      font-size: 21px;
      position: absolute;
      right: 20px;
      top: 12px;
      font-weight: 700;
      line-height: 1;
      color: #000;
      text-shadow: 0 1px 0 #fff;
      filter: alpha(opacity=20);
      opacity: 0.2;
      text-decoration: none;

      &-x:after {
        content: "×";
      }

      &:hover {
        opacity: 1;
        filter: alpha(opacity=100);
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
      padding: 20px;
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
    background-color: rgb(55, 55, 55);
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    filter: alpha(opacity=50);
    z-index: 1050;

    &-hidden {
      display: none;
    }
  }


  &-fade-enter,&-fade-appear {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);    animation-play-state: paused;
  }

  &-fade-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);    animation-play-state: paused;
  }

  &-fade-enter&-fade-enter-active,&-fade-appear&-fade-appear-active  {
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
}
`;

export const Modal: React.FC<ModalProps> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <GlobalStyle />
      <Dialog {...props} closeIcon={<CloseBtn />}>
        {children}
      </Dialog>
    </React.Fragment>
  );
};

const NewAvatar = styled(Modal)<ModalProps>``;

export default withTheme(NewAvatar);
