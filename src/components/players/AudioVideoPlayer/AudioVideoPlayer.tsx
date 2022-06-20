import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { Dropdown, RatioBox, Text } from "../../..";
import format from "date-fns/format";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";

interface StyledAudioVideoPlayerProps {
  mobile?: boolean;
}

interface AudioVideoState {
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
  playbackRate: number;
  level: number;
  quality: number;
}

interface AudioVideoPlayerControlsProps {
  state?: AudioVideoState;
  onSeek?: (time: number) => void;
  onToggle?: () => void;
  onVolume?: (volume: number) => void;
  onFullscreen?: () => void;
  audio?: boolean;
}

const initialVideoState: AudioVideoState = {
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
  playbackRate: 1.0,
  level: 0,
  quality: 0,
};

export interface AudioVideoPlayerProps
  extends StyledAudioVideoPlayerProps,
    AudioVideoPlayerControlsProps,
    ReactPlayerProps {
  ratio?: number;
}

const StyledAudioVideoPlayer = styled("div")<AudioVideoPlayerProps>`
  position: relative;
  background: ${(props) =>
    props.audio &&
    props.light &&
    `url(${props.light}) no-repeat center / cover`};

  ${(props) =>
    !props.audio &&
    `
  &:hover {
    .video-player-controls {
      opacity: 1;
    }
  }`};

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
    bottom: ${(props) => (props.state?.controls ? "120px" : "20px")};
    right: ${(props) => (props.state?.controls ? "0" : "")};
    top: ${(props) => (props.state?.controls ? "0" : "")};
    display: flex;
    align-items: flex-end;
    left: 0;
    background-color: ${(props) =>
      props.state?.controls ? "rgba(0, 0, 0, 0.5)" : "transparent"};
    transition: ${(props) => (props.state?.ready ? "opacity 0.3s" : "none")};
    opacity: ${(props) => (props.state?.playing ? (props.audio ? 1 : 0) : 1)};

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

const StyledVideoControls = styled("div")<AudioVideoPlayerProps>`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 120px;
  width: 100%;
  padding: 20px;
  display: flex;
  opacity: ${(props) => (props.state?.playing ? (props.audio ? 1 : 0) : 1)};
  justify-content: end;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  transition: opacity 0.3s ease-in-out;

  input[type="range"] {
    appearance: none;
    height: 3px;
    background: grey;
    border-radius: 3px;
    background-image: ${({ theme }) =>
      `linear-gradient(${theme.primaryColor}, ${theme.primaryColor})`};
    background-repeat: no-repeat;

    &::-webkit-slider-thumb {
      appearance: none;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background: ${({ theme }) => theme.white};
      cursor: pointer;
      box-shadow: 0 0 2px 0 #555;
    }

    &::-webkit-slider-runnable-track {
      appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }

    &.input-seek {
      width: 100%;
    }

    &.input-volume {
      margin-right: 10px;
      width: 105px;
    }
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

    .controls-left,
    .controls-right {
      display: flex;
      align-items: center;
    }

    .control-button {
      button {
        display: flex;
        align-items: center;
      }
    }

    .control-button-volume {
      margin-left: 70px;
      display: flex;
      align-items: center;
    }
  }

  .control-duration {
    color: ${({ theme }) => theme.white};
  }

  .dropdown-playback-rate {
    &:not(.is-open) {
      color: ${({ theme }) => theme.white};

      * {
        background: transparent;
        color: ${({ theme }) => theme.white};
      }
    }
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

const IconBackward = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_379_22702)">
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
        <clipPath id="clip0_379_22702">
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

const IconPlay = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0469 22C17.5697 22 22.0469 17.5228 22.0469 12C22.0469 6.47715 17.5697 2 12.0469 2C6.52403 2 2.04688 6.47715 2.04688 12C2.04688 17.5228 6.52403 22 12.0469 22Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0469 8L16.0469 12L10.0469 16V8Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconForward = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_379_22706)">
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
        <clipPath id="clip0_379_22706">
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

const IconVolumeFull = () => {
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

const IconVolumeMute = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_379_22723)">
        <path
          d="M11.0469 5L6.04688 9H2.04688V15H6.04688L11.0469 19V5Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.0469 9L17.0469 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0469 9L23.0469 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_379_22723">
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

const IconVolumeMedium = () => {
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
        d="M15.5859 8.45996C16.5233 9.3976 17.0499 10.6691 17.0499 11.995C17.0499 13.3208 16.5233 14.5923 15.5859 15.53"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconVolumeLow = () => {
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

const AudioVideoPlayerControls: React.FC<AudioVideoPlayerControlsProps> = (
  props
) => {
  const {
    state = initialVideoState,
    onSeek,
    onToggle,
    onVolume,
    onFullscreen,
  } = props;

  const getBackgroundSize = (value: number, max: number) => {
    return {
      backgroundSize: `${(value * 100) / max}% 100%`,
    };
  };

  const getVolumeIcon = () => {
    if (state.volume === 0) {
      return <IconVolumeMute />;
    }
    if (state.volume < 0.3) {
      return <IconVolumeLow />;
    }
    if (state.volume < 0.6) {
      return <IconVolumeMedium />;
    }
    return <IconVolumeFull />;
  };

  const toggleVolume = () => {
    if (onVolume) {
      onVolume(state.volume === 0 ? initialVideoState.volume : 0);
    }
  };

  return (
    <StyledVideoControls {...props} className={"video-player-controls"}>
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
            <div className={"control-button"}>
              <button
                type={"button"}
                onClick={() => {
                  const newSek = state.progress.playedSeconds - 10;
                  newSek <= state.duration && onSeek && onSeek(newSek);
                }}
              >
                <IconBackward />
                <Text
                  noMargin
                  size={14}
                  style={{
                    color: "white",
                    marginTop: "-3px",
                    marginLeft: "6px",
                  }}
                >
                  10s
                </Text>
              </button>
            </div>
            <div className={"control-button"}>
              <button type={"button"} onClick={() => onToggle && onToggle()}>
                {state.playing ? <IconStop /> : <IconPlay />}
              </button>
            </div>
            <div className={"control-button"}>
              <button
                type={"button"}
                onClick={() => {
                  const newSek = state.progress.playedSeconds + 10;
                  newSek <= state.duration && onSeek && onSeek(newSek);
                }}
              >
                <IconForward />
                <Text
                  noMargin
                  size={14}
                  style={{
                    color: "white",
                    marginTop: "-3px",
                    marginLeft: "6px",
                  }}
                >
                  10s
                </Text>
              </button>
            </div>
            <div className={"control-button control-button-volume"}>
              <button type={"button"} onClick={() => toggleVolume()}>
                {getVolumeIcon()}
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
              <Text noMargin size={14} style={{ color: "white" }}>
                {format(state.progress.playedSeconds * 1000, "mm:ss")} /{" "}
                {format(state.duration * 1000, "mm:ss")}
              </Text>
            </div>
          </div>
          <div className={"controls-right"}>
            <div className={"control-button"}>
              <Dropdown
                options={[
                  { label: "1x", value: "1.0" },
                  { label: "1.5x", value: "1.5" },
                  { label: "2x", value: "2.0" },
                ]}
                placeholder={`${state.playbackRate}x`}
                onChange={(option) =>
                  (state.playbackRate = Number(option.value))
                }
                placement={"up"}
                className={`dropdown-playback-rate`}
                styles={{
                  minWidth: "40px",
                }}
              />
            </div>
            {state.quality > 0 && (
              <Text
                style={{
                  margin: "0px 10px",
                  color: "white",
                  borderRadius: "4px",
                  border: "2px solid white",
                  padding: "0 4px",
                }}
                size={"12"}
                noMargin
              >
                {state.quality}p
              </Text>
            )}
            <div className={"control-button"}>
              <button
                type={"button"}
                onClick={() => onFullscreen && onFullscreen()}
              >
                <IconFullscreen />
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledVideoControls>
  );
};

export const AudioVideoPlayer: React.FC<AudioVideoPlayerProps> = (props) => {
  const {
    children,
    mobile,
    audio = false,
    light = true,
    ratio = 9 / 16,
  } = props;

  const ref = React.useRef<ReactPlayer>(null);
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const [audioVideoState, setAudioVideoState] =
    React.useState<AudioVideoState>(initialVideoState);

  const checkQuality = React.useCallback((player: ReactPlayer) => {
    if (player?.getInternalPlayer("hls")) {
      const hls = player?.getInternalPlayer("hls");
      if (hls) {
        hls.on("hlsLevelSwitched", (e: string, level: { level: number }) => {
          const newLevel = hls.levels[level.level].height;

          setAudioVideoState((prevState) => ({
            ...prevState,
            quality: newLevel,
          }));
        });
      }
    }
  }, []);

  return (
    <StyledAudioVideoPlayer
      state={audioVideoState}
      ref={refWrapper}
      audio={audio}
      light={light}
    >
      <RatioBox ratio={ratio}>
        <ReactPlayer
          {...props}
          light={light}
          ref={ref}
          width={"100%"}
          height={"100%"}
          controls={!!mobile}
          playIcon={IconPlayCircle()}
          playing={audioVideoState.playing}
          volume={audioVideoState.volume}
          playbackRate={audioVideoState.playbackRate}
          onReady={() => {
            setAudioVideoState((prevState) => ({ ...prevState, ready: true }));
            !audio && checkQuality(ref.current as ReactPlayer);
          }}
          onDuration={(duration) =>
            setAudioVideoState((prevState) => ({ ...prevState, duration }))
          }
          onStart={() =>
            setAudioVideoState((prevState) => ({
              ...prevState,
              playing: true,
            }))
          }
          onProgress={(progress) => {
            setAudioVideoState((prevState) => ({ ...prevState, progress }));
          }}
          onPlay={() => {
            setAudioVideoState((prevState) => ({
              ...prevState,
              playing: true,
            }));
          }}
          onEnded={() => {
            setAudioVideoState((prevState) => ({
              ...prevState,
              controls: false,
              playing: false,
            }));
            ref.current?.showPreview();
          }}
          onClickPreview={() =>
            setAudioVideoState((prevState) => ({
              ...prevState,
              controls: true,
              playing: true,
            }))
          }
        />
      </RatioBox>
      {!mobile && audioVideoState.controls && (
        <AudioVideoPlayerControls
          audio={audio}
          state={audioVideoState}
          onVolume={(volume) => {
            setAudioVideoState((prevState) => ({ ...prevState, volume }));
          }}
          onToggle={() => {
            setAudioVideoState((prevState) => ({
              ...prevState,
              playing: !prevState.playing,
            }));
          }}
          onSeek={(time) => ref.current?.seekTo(time)}
          onFullscreen={() => {
            refWrapper.current &&
              screenfull.toggle(findDOMNode(refWrapper.current) as Element);
          }}
        />
      )}
      {!mobile && (
        <div
          onClick={() =>
            audioVideoState.ready &&
            setAudioVideoState((prevState) => ({
              ...prevState,
              playing: !prevState.playing,
            }))
          }
          role={audioVideoState.playing ? "button" : undefined}
          onKeyDown={() => {
            return true;
          }}
        >
          {children}
        </div>
      )}
    </StyledAudioVideoPlayer>
  );
};

export default withTheme(styled(AudioVideoPlayer)<AudioVideoPlayerProps>``);
