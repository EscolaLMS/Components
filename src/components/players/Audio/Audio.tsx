import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Text } from "../../atoms/Typography/Text";

interface TrackProps {
  src: string;
  kind: string;
  srcLang: string;
  label: string;
}
interface AudioPlayerProps {
  url?: string;
  onFinish: () => void;
  track?: TrackProps;
}

const StyledWrapper = styled("div")``;

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  onFinish,
  track,
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
          {track && (
            <track
              src={track.src}
              kind={track.kind}
              srcLang={track.srcLang}
              label={track.label}
            />
          )}
        </audio>
      )}
    </StyledWrapper>
  );
};

export default withTheme(styled(AudioPlayer)<AudioPlayerProps>``);
