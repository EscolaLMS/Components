import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Text } from "../../atoms/Typography/Text";
interface AudioPlayerProps {
  url?: string;
  onFinish: () => void;
}

const StyledWrapper = styled("div")``;

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  onFinish,
}): React.ReactElement => {
  if (!url) {
    return (
      <Text size="14" noMargin>
        no source url provided
      </Text>
    );
  }

  return (
    <StyledWrapper>
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
    </StyledWrapper>
  );
};

export default withTheme(styled(AudioPlayer)<AudioPlayerProps>``);
