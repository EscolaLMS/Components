import React, { useContext, useEffect, useMemo } from "react";
import styled, { withTheme, ThemeContext } from "styled-components";
import { XAPIEvent, Player } from "@escolalms/h5p-react";
//import { Player } from "./player";

import * as API from "@escolalms/sdk/lib/types/api";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react/context";

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

export const H5Player: React.FC<H5PProps> = ({
  id,
  onXAPI,
  overwriteFileName = "h5p_overwrite.css",
  h5pObject,
}) => {
  const { fetchH5P, h5p } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchH5P(id);
  }, [id, fetchH5P]);

  const themeContext = useContext(ThemeContext);

  const h5pThemeCSSOverwriteSrc = useMemo(() => {
    const css = `
    .h5p-baq-intro-page {
      background: ${themeContext.secondaryColor} !important;
      color: ${themeContext.primaryColor} !important;
    }
  `;
    return `data:text/css;base64,${btoa(css)}`;
  }, [themeContext]);

  return (
    <StyledH5P>
      {(h5p.value || h5pObject) && (
        <Player
          key={h5pThemeCSSOverwriteSrc} // this is required to force a re-render when the theme changes
          h5pObject={h5p.value || h5pObject}
          id={id}
          onXAPI={(event: XAPIEvent) => onXAPI && onXAPI(event)}
          styles={[
            `${window.location.origin}/${overwriteFileName}`,
            h5pThemeCSSOverwriteSrc,
          ]}
        />
      )}
    </StyledH5P>
  );
};

export default withTheme(styled(H5Player)<H5PProps>``);
