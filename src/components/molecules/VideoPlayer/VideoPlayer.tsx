import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { RatioBox } from "../../../";

interface StyledVideoPlayerProps {
  mobile?: boolean;
}

export interface VideoPlayerProps
  extends StyledVideoPlayerProps,
    ReactPlayerProps {}

const StyledVideoPlayer = styled("div")<StyledVideoPlayerProps>`
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
    bottom: 40px;
    display: ${(props) => (props.mobile ? "none" : "block")};
    left: 18px;

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

const PlayIcon = () => {
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

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { children, mobile } = props;
  const [visibleOverlay, setVisibleOverlay] = React.useState<boolean>(true);

  return (
    <StyledVideoPlayer mobile={mobile}>
      <RatioBox ratio={9 / 16}>
        <ReactPlayer
          {...props}
          width={"100%"}
          height={"100%"}
          onPlay={() => {
            setVisibleOverlay(false);
          }}
          playIcon={PlayIcon()}
          playing
          controls
        />
      </RatioBox>

      {visibleOverlay && <React.Fragment>{children}</React.Fragment>}
    </StyledVideoPlayer>
  );
};

const NewVideoPlayer = styled(VideoPlayer)<VideoPlayerProps>``;

export default withTheme(NewVideoPlayer);
