import React, { useEffect, useContext } from "react";
import styled, { withTheme } from "styled-components";
import { Player, XAPIEvent } from "@escolalms/h5p-react";

import { EscolaLMSContext } from "@escolalms/sdk/lib/react";

const StyledH5P = styled("div")`
  border-radius: ${(props) => props.theme.buttonRadius || 0}px;
  position: relative;
  width: 100%;
`;

const H5P: React.FC<{
  id: string;
  onXAPI?: (e: XAPIEvent) => void;
  overwriteFileName?: string;
}> = ({ id, onXAPI, overwriteFileName }) => {
  const { fetchH5P, h5p } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchH5P(id);
  }, [id, fetchH5P]);

  return (
    <StyledH5P>
      {h5p.value && (
        <Player
          h5pObject={h5p.value}
          id={id}
          onXAPI={(event: XAPIEvent) => onXAPI && onXAPI(event)}
          styles={
            overwriteFileName && [
              `${window.location.origin}/${overwriteFileName}`,
            ]
          }
        />
      )}
    </StyledH5P>
  );
};

export default withTheme(styled(H5P)``);
