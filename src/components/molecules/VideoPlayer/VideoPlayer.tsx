import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { RatioBox } from "../../../";
import { format } from "date-fns";

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

/*
const VideoPlayerController:React.FC = (props) => {
  console.log(props);
  return <input type="range" min="0" max="100" />;
});
*/

type VideoState = {
  ready: boolean;
  playing: boolean;
  progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  };
  duration: number;
};

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
};

const VideoPlayerControls: React.FC<{
  state: VideoState;
  onSeek?: (time: number) => void;
}> = (props) => {
  const { state, onSeek } = props;
  return (
    <div>
      Seek range:
      <input
        onChange={(e) => onSeek && onSeek(e.target.valueAsNumber)}
        type="range"
        min={0}
        max={state.duration}
        value={state.progress.playedSeconds}
      />
      Loaded range:
      <input
        type="range"
        readOnly
        min={0}
        max={state.duration}
        value={state.progress.loadedSeconds}
      />
      Time:
      <pre>
        {format(state.progress.playedSeconds * 1000, "mm:ss")} /{" "}
        {format(state.duration * 1000, "mm:ss")}
      </pre>
      <button
        onClick={() => {
          const newSek = state.progress.playedSeconds + 10;
          newSek <= state.duration && onSeek && onSeek(newSek);
        }}
      >
        +10s
      </button>
      <button
        onClick={() => {
          const newSek =
            state.progress.playedSeconds - 10 < 0
              ? 0
              : state.progress.playedSeconds - 10;
          onSeek && onSeek(newSek);
        }}
      >
        -10s
      </button>
    </div>
  );
};

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { children, mobile } = props;
  const [visibleOverlay, setVisibleOverlay] = React.useState<boolean>(true);

  const ref = React.useRef<ReactPlayer>(null);

  const [videoState, setVideoState] =
    React.useState<VideoState>(initialVideoState);

  React.useEffect(() => {
    if (ref.current) {
      //console.log(ref.current);
    }
  }, [ref]);

  return (
    <StyledVideoPlayer mobile={mobile}>
      <RatioBox ratio={9 / 16}>
        <ReactPlayer
          ref={ref}
          {...props}
          onReady={() =>
            setVideoState((prevState) => ({ ...prevState, ready: true }))
          }
          onDuration={(duration) =>
            setVideoState((prevState) => ({ ...prevState, duration }))
          }
          onStart={() =>
            setVideoState((prevState) => ({ ...prevState, playing: true }))
          }
          onPause={() =>
            setVideoState((prevState) => ({ ...prevState, playing: false }))
          }
          onEnded={() =>
            setVideoState((prevState) => ({ ...prevState, playing: false }))
          }
          onProgress={(progress) =>
            setVideoState((prevState) => ({ ...prevState, progress }))
          }
          width={"100%"}
          height={"100%"}
          onPlay={() => {
            setVideoState((prevState) => ({ ...prevState, playing: true }));
            setVisibleOverlay(false);
          }}
          playIcon={<PlayIcon />}
          playing
          controls
        />
      </RatioBox>

      <VideoPlayerControls
        state={videoState}
        onSeek={(time) => ref.current?.seekTo(time)}
      />

      {visibleOverlay && <React.Fragment>{children}</React.Fragment>}
    </StyledVideoPlayer>
  );
};

export default withTheme(styled(VideoPlayer)<VideoPlayerProps>``);
