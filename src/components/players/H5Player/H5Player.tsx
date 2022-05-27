import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Player, XAPIEvent } from "@escolalms/h5p-react";
import * as API from "@escolalms/sdk/lib/types/api";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";

const StyledH5P = styled("div")`
  border-radius: ${(props) => props.theme.buttonRadius || 0}px;
  position: relative;
  width: 100%;
`;

export interface H5PProps {
  id: string;
  onXAPI?: (e: XAPIEvent) => void;
  overwriteFileName?: string;
  h5pObject?: API.H5PObject;
}

export const H5P: React.FC<H5PProps> = ({
  id,
  onXAPI,
  overwriteFileName = "h5p_overwrite.css",
  h5pObject,
}) => {
  const { fetchH5P, h5p } = React.useContext(EscolaLMSContext);

  React.useEffect(() => {
    fetchH5P(id);
  }, [id, fetchH5P]);

  return (
    <StyledH5P>
      {(h5p.value || h5pObject) && (
        <Player
          h5pObject={h5p.value || h5pObject}
          id={id}
          onXAPI={(event: XAPIEvent) => onXAPI && onXAPI(event)}
          styles={[`${window.location.origin}/${overwriteFileName}`]}
        />
      )}
    </StyledH5P>
  );
};

export default withTheme(styled(H5P)<H5PProps>``);
