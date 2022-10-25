import Title from "../../atoms/Typography/Title";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "../../atoms/Button/Button";
import { ExtendableStyledComponent } from "types/component";
import chroma from "chroma-js";
import { t } from "i18next";

interface Props extends ExtendableStyledComponent {
  topic: string;
  onNextButtonClick: () => void;
  onCountdown: () => void;
  onCancel: () => void;
  countdownValue: number;
}

const StyledVideoEndscreen = styled.div`
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;

  .video-endscreen {
    &__title,
    &__subtitle {
      color: #fff;
      text-align: center;
    }

    &__title,
    &__subtitle,
    &__play {
      margin-top: 16px;
    }

    &__cancel {
      color: #fff;
      border: 0;

      &:hover {
        background: transparent;
        color: ${(props) => chroma(props.theme.white).alpha(0.75).hex()};
      }
    }
  }
`;

const VideoEndscreen: React.FC<Props> = ({
  topic,
  countdownValue,
  onCancel,
  onCountdown,
  onNextButtonClick,
  className,
}) => {
  const [timer, setTimer] = React.useState(10);

  const id = useRef<null | number>(null);
  const clearTimer = () => {
    typeof id.current === "number" && clearInterval(id.current);
  };

  const play = () => {
    clearTimer();
    onNextButtonClick();
  };

  const cancel = () => {
    clearTimer();
    onCancel();
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    return () => clearTimer();
  }, [countdownValue]);

  useEffect(() => {
    if (timer === 1) {
      setTimeout(() => {
        onCountdown();
      }, 1000);
      clearTimer();
    }
  }, [timer]);

  return (
    <StyledVideoEndscreen
      className={`wellms-component video-endscreen ${className ?? ""}`}
    >
      <Title level={3} as={"h2"} className="video-endscreen__title">
        {topic}
      </Title>
      <Title level={4} as={"h2"} className="video-endscreen__subtitle">
        {t<string>("VideoPlayer.Next")}... {timer}{" "}
        {t<string>("VideoPlayer.Seconds")}
      </Title>
      <Button mode="secondary" className="video-endscreen__play" onClick={play}>
        {t<string>("VideoPlayer.PlayNow")}
      </Button>
      <Button
        mode="outline"
        className="video-endscreen__cancel"
        onClick={cancel}
      >
        {t<string>("VideoPlayer.Cancel")}
      </Button>
    </StyledVideoEndscreen>
  );
};

export default VideoEndscreen;
