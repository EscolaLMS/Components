import * as React from "react";
import styled, { withTheme } from "styled-components";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isSmall?: boolean;
  alt: string;
}

const StyledLogo = styled("img")<LogoProps>`
  max-width: ${(props) => (props.isSmall ? "80px" : "120px")};
  max-height: ${(props) => (props.isSmall ? "50px" : "75px")};
`;

export const Logo: React.FC<LogoProps> = (props) => (
  <StyledLogo {...props} className="wellms-component" />
);

const NewStyledLogo = styled(Logo)<LogoProps>``;

export default withTheme(NewStyledLogo);
