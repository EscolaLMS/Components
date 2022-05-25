import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { RatioBox } from "../../../";
import format from "date-fns/format";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";

interface StyledVideoPlayerProps {
  mobile?: boolean;
}

interface VideoState {
  ready: boolean;
  playing: boolean;
  progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  };
  duration: number;
  volume: number;
  controls: boolean;
}

interface VideoPlayerControlsProps {
  state: VideoState;
  onSeek?: (time: number) => void;
  onToggle?: () => void;
  onVolume?: (volume: number) => void;
  onFullscreen?: () => void;
}

const initialVideoState: VideoState = {
  ready: false,
  playing: false,
  progress: {
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  },
  duration: 0,
  volume: 0.8,
  controls: false,
};

export interface VideoPlayerProps
  extends StyledVideoPlayerProps,
    VideoPlayerControlsProps,
    ReactPlayerProps {}

const StyledVideoPlayer = styled("div")<VideoPlayerControlsProps>`
  position: relative;

  .react-player__preview {
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      content: "";
    }

    > svg {
      position: relative;
    }
  }

  .video-player-overlay {
    position: absolute;
    padding: 20px;
    bottom: ${(props) => (props.state.controls ? "120px" : "20px")};
    right: ${(props) => (props.state.controls ? "0" : "")};
    top: ${(props) => (props.state.controls ? "0" : "")};
    display: flex;
    align-items: flex-end;
    left: 0;
    background-color: ${(props) =>
      props.state.controls ? "rgba(0, 0, 0, 0.5)" : "transparent"};

    * {
      color: ${({ theme }) => theme.white};
    }

    h3 {
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .video-player-header {
    display: flex;
    align-items: center;

    .video-player-badge {
      margin-right: 10px;
    }
  }

  .video-player-footer {
    display: flex;

    > p:first-child {
      margin-right: 35px;
    }
  }

  .video-player-breadcrumbs {
    display: inline-flex;

    a {
      position: relative;
      margin-right: 36px;

      &:not(:last-child):before {
        position: absolute;
        right: -24px;

        content: ">";
      }
    }
  }
`;

const StyledVideoControls = styled("div")<StyledVideoPlayerProps>`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 120px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  .input-seek {
    width: 100%;
  }

  input[type="range"] {
    appearance: none;
    height: 3px;
    background: grey;
    border-radius: 3px;
    background-image: linear-gradient(
      ${({ theme }) => theme.primaryColor},
      ${({ theme }) => theme.primaryColor}
    );
    background-repeat: no-repeat;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.white};
    cursor: pointer;
    box-shadow: 0 0 2px 0 #555;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  button {
    appearance: none;
    background-color: transparent;
    border: none;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .controls-group {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .controls-left {
    display: flex;
    align-items: center;
  }

  .control-volume {
    display: flex;
    align-items: center;

    button {
      margin-left: 70px;
    }

    .input-volume {
      margin-right: 10px;
      width: 105px;
    }
  }

  .control-duration {
    color: ${({ theme }) => theme.white};
  }
`;

const IconPlayCircle = () => {
  return (
    <svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33 65C50.6731 65 65 50.6731 65 33C65 15.3269 50.6731 1 33 1C15.3269 1 1 15.3269 1 33C1 50.6731 15.3269 65 33 65Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6016 20.2L45.8016 33L26.6016 45.8V20.2Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconBackSeconds = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_413_26035)">
        <path
          d="M1.04688 4V10H7.04688"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.55687 15.0004C4.20527 16.8408 5.43421 18.4206 7.05853 19.5018C8.68285 20.583 10.6146 21.107 12.5626 20.9949C14.5106 20.8828 16.3695 20.1406 17.859 18.8802C19.3486 17.6198 20.3881 15.9094 20.8211 14.0068C21.2541 12.1042 21.057 10.1124 20.2595 8.33154C19.462 6.55068 18.1074 5.07723 16.3997 4.1332C14.692 3.18917 12.7238 2.8257 10.7916 3.09755C8.85933 3.36941 7.06779 4.26186 5.68687 5.64044L1.04688 10.0004"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_413_26035">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.046875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconStop = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0469 4H6.04688V20H10.0469V4Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0469 4H14.0469V20H18.0469V4Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconForwardSeconds = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_413_26026)">
        <path
          d="M23.0469 4V10H17.0469"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5368 15C19.8867 16.8399 18.6563 18.4187 17.0309 19.4985C15.4055 20.5783 13.4732 21.1006 11.5252 20.9866C9.57714 20.8726 7.71891 20.1286 6.23051 18.8667C4.74211 17.6047 3.70418 15.8932 3.27312 13.9901C2.84206 12.0869 3.04123 10.0952 3.84062 8.31508C4.64 6.53496 5.99629 5.06288 7.70511 4.12065C9.41392 3.17843 11.3827 2.81711 13.3147 3.09116C15.2467 3.3652 17.0374 4.25975 18.4168 5.64001L23.0468 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_413_26026">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.046875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconVolume = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0469 5L6.04688 9H2.04688V15H6.04688L11.0469 19V5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1159 4.92969C20.9906 6.80496 22.0438 9.34805 22.0438 11.9997C22.0438 14.6513 20.9906 17.1944 19.1159 19.0697M15.5859 8.45969C16.5233 9.39733 17.0499 10.6689 17.0499 11.9947C17.0499 13.3205 16.5233 14.592 15.5859 15.5297"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconQuality = () => {
  return (
    <svg
      width="41"
      height="22"
      viewBox="0 0 41 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27926 7.85156V15H8.37594V8.97949L6.55465 9.64355V8.82812L9.13766 7.85156H9.27926ZM16.3984 10.8789V11.9629C16.3984 12.5456 16.3463 13.0371 16.2422 13.4375C16.138 13.8379 15.9882 14.1602 15.7929 14.4043C15.5976 14.6484 15.3616 14.8258 15.0849 14.9365C14.8115 15.0439 14.5022 15.0977 14.1572 15.0977C13.8838 15.0977 13.6315 15.0635 13.4004 14.9951C13.1692 14.9268 12.9609 14.8177 12.7754 14.668C12.5931 14.515 12.4368 14.3164 12.3066 14.0723C12.1764 13.8281 12.0771 13.5319 12.0088 13.1836C11.9404 12.8353 11.9062 12.4284 11.9062 11.9629V10.8789C11.9062 10.2962 11.9583 9.80794 12.0625 9.41406C12.1699 9.02018 12.3213 8.70443 12.5166 8.4668C12.7119 8.22591 12.9463 8.05339 13.2197 7.94922C13.4964 7.84505 13.8056 7.79297 14.1474 7.79297C14.4241 7.79297 14.678 7.82715 14.9091 7.89551C15.1435 7.96061 15.3519 8.06641 15.5341 8.21289C15.7164 8.35612 15.8711 8.54818 15.998 8.78906C16.1282 9.02669 16.2275 9.31803 16.2959 9.66309C16.3642 10.0081 16.3984 10.4134 16.3984 10.8789ZM15.4902 12.1094V10.7275C15.4902 10.4085 15.4707 10.1286 15.4316 9.8877C15.3958 9.64355 15.3421 9.43522 15.2705 9.2627C15.1989 9.09017 15.1077 8.9502 14.997 8.84277C14.8896 8.73535 14.7643 8.65723 14.6211 8.6084C14.4811 8.55632 14.3232 8.53027 14.1474 8.53027C13.9326 8.53027 13.7422 8.57096 13.5761 8.65234C13.4101 8.73047 13.2701 8.85579 13.1562 9.02832C13.0455 9.20085 12.9609 9.42708 12.9023 9.70703C12.8437 9.98698 12.8144 10.3271 12.8144 10.7275V12.1094C12.8144 12.4284 12.8323 12.71 12.8681 12.9541C12.9072 13.1982 12.9642 13.4098 13.039 13.5889C13.1139 13.7646 13.205 13.9095 13.3125 14.0234C13.4199 14.1374 13.5436 14.222 13.6836 14.2773C13.8268 14.3294 13.9847 14.3555 14.1572 14.3555C14.3785 14.3555 14.5722 14.3132 14.7382 14.2285C14.9043 14.1439 15.0426 14.012 15.1533 13.833C15.2672 13.6507 15.3519 13.418 15.4072 13.1348C15.4625 12.8483 15.4902 12.5065 15.4902 12.1094ZM22.0429 13.0762C22.0429 13.5091 21.942 13.877 21.7402 14.1797C21.5416 14.4792 21.2715 14.707 20.9297 14.8633C20.5911 15.0195 20.2086 15.0977 19.7822 15.0977C19.3558 15.0977 18.9716 15.0195 18.6298 14.8633C18.2881 14.707 18.0179 14.4792 17.8193 14.1797C17.6207 13.877 17.5215 13.5091 17.5215 13.0762C17.5215 12.793 17.5752 12.5342 17.6826 12.2998C17.7933 12.0622 17.9479 11.8555 18.1465 11.6797C18.3483 11.5039 18.5859 11.3688 18.8593 11.2744C19.136 11.1768 19.4404 11.1279 19.7724 11.1279C20.2086 11.1279 20.5976 11.2126 20.9394 11.3818C21.2812 11.5479 21.5498 11.7773 21.7451 12.0703C21.9437 12.3633 22.0429 12.6986 22.0429 13.0762ZM21.1347 13.0566C21.1347 12.793 21.0778 12.5602 20.9638 12.3584C20.8499 12.1533 20.6904 11.9938 20.4853 11.8799C20.2802 11.766 20.0426 11.709 19.7724 11.709C19.4957 11.709 19.2565 11.766 19.0547 11.8799C18.8561 11.9938 18.7015 12.1533 18.5908 12.3584C18.4801 12.5602 18.4248 12.793 18.4248 13.0566C18.4248 13.3301 18.4785 13.5645 18.5859 13.7598C18.6966 13.9518 18.8528 14.0999 19.0547 14.2041C19.2597 14.305 19.5022 14.3555 19.7822 14.3555C20.0621 14.3555 20.303 14.305 20.5048 14.2041C20.7067 14.0999 20.8613 13.9518 20.9687 13.7598C21.0794 13.5645 21.1347 13.3301 21.1347 13.0566ZM21.8769 9.74121C21.8769 10.0863 21.7858 10.3971 21.6035 10.6738C21.4212 10.9505 21.1722 11.1686 20.8564 11.3281C20.5407 11.4876 20.1826 11.5674 19.7822 11.5674C19.3753 11.5674 19.0123 11.4876 18.6933 11.3281C18.3776 11.1686 18.1302 10.9505 17.9511 10.6738C17.7721 10.3971 17.6826 10.0863 17.6826 9.74121C17.6826 9.3278 17.7721 8.97624 17.9511 8.68652C18.1334 8.39681 18.3825 8.17546 18.6982 8.02246C19.014 7.86947 19.3737 7.79297 19.7773 7.79297C20.1842 7.79297 20.5455 7.86947 20.8613 8.02246C21.177 8.17546 21.4244 8.39681 21.6035 8.68652C21.7858 8.97624 21.8769 9.3278 21.8769 9.74121ZM20.9736 9.75586C20.9736 9.51823 20.9231 9.30827 20.8222 9.12598C20.7213 8.94368 20.5813 8.80046 20.4023 8.69629C20.2233 8.58887 20.0149 8.53516 19.7773 8.53516C19.5397 8.53516 19.3313 8.58561 19.1523 8.68652C18.9765 8.78418 18.8382 8.92415 18.7373 9.10645C18.6396 9.28874 18.5908 9.50521 18.5908 9.75586C18.5908 10 18.6396 10.2132 18.7373 10.3955C18.8382 10.5778 18.9782 10.7194 19.1572 10.8203C19.3362 10.9212 19.5446 10.9717 19.7822 10.9717C20.0198 10.9717 20.2265 10.9212 20.4023 10.8203C20.5813 10.7194 20.7213 10.5778 20.8222 10.3955C20.9231 10.2132 20.9736 10 20.9736 9.75586ZM27.6484 10.8789V11.9629C27.6484 12.5456 27.5963 13.0371 27.4922 13.4375C27.388 13.8379 27.2382 14.1602 27.0429 14.4043C26.8476 14.6484 26.6116 14.8258 26.3349 14.9365C26.0615 15.0439 25.7522 15.0977 25.4072 15.0977C25.1338 15.0977 24.8815 15.0635 24.6504 14.9951C24.4192 14.9268 24.2109 14.8177 24.0254 14.668C23.8431 14.515 23.6868 14.3164 23.5566 14.0723C23.4264 13.8281 23.3271 13.5319 23.2588 13.1836C23.1904 12.8353 23.1562 12.4284 23.1562 11.9629V10.8789C23.1562 10.2962 23.2083 9.80794 23.3125 9.41406C23.4199 9.02018 23.5713 8.70443 23.7666 8.4668C23.9619 8.22591 24.1963 8.05339 24.4697 7.94922C24.7464 7.84505 25.0556 7.79297 25.3974 7.79297C25.6741 7.79297 25.928 7.82715 26.1591 7.89551C26.3935 7.96061 26.6019 8.06641 26.7841 8.21289C26.9664 8.35612 27.1211 8.54818 27.248 8.78906C27.3782 9.02669 27.4775 9.31803 27.5459 9.66309C27.6142 10.0081 27.6484 10.4134 27.6484 10.8789ZM26.7402 12.1094V10.7275C26.7402 10.4085 26.7207 10.1286 26.6816 9.8877C26.6458 9.64355 26.5921 9.43522 26.5205 9.2627C26.4489 9.09017 26.3577 8.9502 26.247 8.84277C26.1396 8.73535 26.0143 8.65723 25.8711 8.6084C25.7311 8.55632 25.5732 8.53027 25.3974 8.53027C25.1826 8.53027 24.9922 8.57096 24.8261 8.65234C24.6601 8.73047 24.5201 8.85579 24.4062 9.02832C24.2955 9.20085 24.2109 9.42708 24.1523 9.70703C24.0937 9.98698 24.0644 10.3271 24.0644 10.7275V12.1094C24.0644 12.4284 24.0823 12.71 24.1181 12.9541C24.1572 13.1982 24.2142 13.4098 24.289 13.5889C24.3639 13.7646 24.455 13.9095 24.5625 14.0234C24.6699 14.1374 24.7936 14.222 24.9336 14.2773C25.0768 14.3294 25.2347 14.3555 25.4072 14.3555C25.6285 14.3555 25.8222 14.3132 25.9882 14.2285C26.1543 14.1439 26.2926 14.012 26.4033 13.833C26.5172 13.6507 26.6019 13.418 26.6572 13.1348C26.7125 12.8483 26.7402 12.5065 26.7402 12.1094ZM29.8115 10.7324V17.0312H28.9033V9.7168H29.7334L29.8115 10.7324ZM33.3711 12.3145V12.417C33.3711 12.8011 33.3255 13.1576 33.2343 13.4863C33.1432 13.8118 33.0097 14.0951 32.834 14.3359C32.6614 14.5768 32.4482 14.764 32.1943 14.8975C31.9404 15.0309 31.6491 15.0977 31.3203 15.0977C30.985 15.0977 30.6888 15.0423 30.4316 14.9316C30.1744 14.821 29.9563 14.6598 29.7773 14.4482C29.5983 14.2367 29.455 13.9827 29.3476 13.6865C29.2435 13.3903 29.1718 13.0566 29.1328 12.6855V12.1387C29.1718 11.748 29.2451 11.3981 29.3525 11.0889C29.4599 10.7796 29.6015 10.516 29.7773 10.2979C29.9563 10.0765 30.1728 9.90885 30.4267 9.79492C30.6806 9.67773 30.9736 9.61914 31.3056 9.61914C31.6377 9.61914 31.9323 9.68424 32.1894 9.81445C32.4466 9.94141 32.6631 10.1237 32.8388 10.3613C33.0146 10.599 33.1465 10.8838 33.2343 11.2158C33.3255 11.5446 33.3711 11.9108 33.3711 12.3145ZM32.4629 12.417V12.3145C32.4629 12.0508 32.4352 11.8034 32.3798 11.5723C32.3245 11.3379 32.2382 11.1328 32.1211 10.957C32.0071 10.778 31.8606 10.638 31.6816 10.5371C31.5026 10.4329 31.2894 10.3809 31.042 10.3809C30.8141 10.3809 30.6155 10.4199 30.4463 10.498C30.2802 10.5762 30.1386 10.682 30.0215 10.8154C29.9043 10.9456 29.8082 11.0954 29.7334 11.2646C29.6617 11.4307 29.608 11.6032 29.5722 11.7822V13.0469C29.6373 13.2747 29.7285 13.4896 29.8457 13.6914C29.9629 13.89 30.1191 14.0511 30.3144 14.1748C30.5097 14.2952 30.7555 14.3555 31.0517 14.3555C31.2959 14.3555 31.5058 14.305 31.6816 14.2041C31.8606 14.0999 32.0071 13.9583 32.1211 13.7793C32.2382 13.6003 32.3245 13.3952 32.3798 13.1641C32.4352 12.9297 32.4629 12.6807 32.4629 12.417Z"
        fill="white"
      />
      <rect
        x="1.04688"
        y="1"
        width="38"
        height="20"
        rx="3"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

const IconFullscreen = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.04688 3H5.04688C4.51644 3 4.00773 3.21071 3.63266 3.58579C3.25759 3.96086 3.04688 4.46957 3.04688 5V8M21.0469 8V5C21.0469 4.46957 20.8362 3.96086 20.4611 3.58579C20.086 3.21071 19.5773 3 19.0469 3H16.0469M16.0469 21H19.0469C19.5773 21 20.086 20.7893 20.4611 20.4142C20.8362 20.0391 21.0469 19.5304 21.0469 19V16M3.04688 16V19C3.04688 19.5304 3.25759 20.0391 3.63266 20.4142C4.00773 20.7893 4.51644 21 5.04688 21H8.04688"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = (props) => {
  const { state, onSeek, onToggle, onVolume, onFullscreen } = props;

  const getBackgroundSize = (value: number, max: number) => {
    return {
      backgroundSize: `${(value * 100) / max}% 100%`,
    };
  };

  return (
    <StyledVideoControls>
      <div>
        <input
          onChange={(e) => onSeek && onSeek(e.target.valueAsNumber)}
          type="range"
          className={"input-seek"}
          min={0}
          max={state.duration}
          value={state.progress.playedSeconds}
          style={getBackgroundSize(
            state.progress.playedSeconds,
            state.duration
          )}
        />
        <div className={"controls-group"}>
          <div className={"controls-left"}>
            <button
              type={"button"}
              onClick={() => {
                const newSek = state.progress.playedSeconds - 10;
                newSek <= state.duration && onSeek && onSeek(newSek);
              }}
            >
              <IconBackSeconds />
            </button>
            <button type={"button"} onClick={() => onToggle && onToggle()}>
              <IconStop />
            </button>
            <button
              type={"button"}
              onClick={() => {
                const newSek = state.progress.playedSeconds + 10;
                newSek <= state.duration && onSeek && onSeek(newSek);
              }}
            >
              <IconForwardSeconds />
            </button>
            <div className={"control-volume"}>
              <button type={"button"}>
                <IconVolume />
              </button>
              <input
                onChange={(e) => onVolume && onVolume(e.target.valueAsNumber)}
                type="range"
                min={0}
                max={0.999999}
                value={state.volume}
                step="any"
                className={"input-volume"}
                style={getBackgroundSize(state.volume, 0.999999)}
              />
              <span className={"control-duration"}>
                {format(state.progress.playedSeconds * 1000, "mm:ss")} /{" "}
                {format(state.duration * 1000, "mm:ss")}
              </span>
            </div>
          </div>
          <div className={"controls-right"}>
            {/*todo: Quality Button*/}
            {/*<button type={"button"}>*/}
            {/*  <IconQuality />*/}
            {/*</button>*/}
            <button
              type={"button"}
              onClick={() => onFullscreen && onFullscreen()}
            >
              <IconFullscreen />
            </button>
          </div>
        </div>
      </div>
    </StyledVideoControls>
  );
};

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { children, mobile } = props;

  const ref = React.useRef<ReactPlayer>(null);
  const [videoState, setVideoState] =
    React.useState<VideoState>(initialVideoState);

  return (
    <StyledVideoPlayer state={videoState}>
      <RatioBox ratio={9 / 16}>
        <ReactPlayer
          {...props}
          ref={ref}
          width={"100%"}
          height={"100%"}
          controls={!!mobile}
          playIcon={IconPlayCircle()}
          playing={videoState.playing}
          volume={videoState.volume}
          onReady={() =>
            setVideoState((prevState) => ({ ...prevState, ready: true }))
          }
          onDuration={(duration) =>
            setVideoState((prevState) => ({ ...prevState, duration }))
          }
          onStart={() =>
            setVideoState((prevState) => ({ ...prevState, playing: true }))
          }
          onProgress={(progress) => {
            setVideoState((prevState) => ({ ...prevState, progress }));
          }}
          onPlay={() => {
            setVideoState((prevState) => ({ ...prevState, playing: true }));
          }}
          onEnded={() => {
            setVideoState((prevState) => ({
              ...prevState,
              controls: false,
              playing: false,
            }));
            ref.current?.showPreview();
          }}
          onClickPreview={() =>
            setVideoState((prevState) => ({
              ...prevState,
              controls: true,
              playing: true,
            }))
          }
        />
      </RatioBox>

      {!mobile && videoState.controls && (
        <VideoPlayerControls
          state={videoState}
          onVolume={(volume) => {
            setVideoState((prevState) => ({ ...prevState, volume }));
          }}
          onToggle={() => {
            setVideoState((prevState) => ({
              ...prevState,
              playing: !prevState.playing,
            }));
          }}
          onSeek={(time) => ref.current?.seekTo(time)}
          onFullscreen={() => {
            ref.current &&
              screenfull.request(findDOMNode(ref.current) as Element);
          }}
        />
      )}

      {!mobile && !videoState.playing && (
        <React.Fragment>{children}</React.Fragment>
      )}
    </StyledVideoPlayer>
  );
};

export default withTheme(styled(VideoPlayer)<VideoPlayerProps>``);
