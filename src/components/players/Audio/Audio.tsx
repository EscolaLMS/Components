import * as React from "react";
import styled, { withTheme } from "styled-components";

interface AudioPlayerProps {
  url?: string;
  onFinish: () => void;
}

const StyledAudio = styled("div")``;

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  onFinish,
}): React.ReactElement => {
  if (!url) {
    return <p>No lesson data.</p>;
  }

  return (
    <StyledAudio>
      {url && (
        <audio
          onEnded={(): void => {
            onFinish();
          }}
          controls
          controlsList="nodownload noremoteplayback"
        >
          <source src={url} />
        </audio>
      )}
    </StyledAudio>
  );
};

export default withTheme(styled(AudioPlayer)<AudioPlayerProps>``);
