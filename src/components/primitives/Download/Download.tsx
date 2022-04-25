import * as React from "react";
import styled, { ThemeContext, withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";

export interface ComponentProps {
  href: string;
  fileName?: string | React.ReactNode;
  darkTheme?: boolean;
}

const StyledDiv = styled.div<ComponentProps>`
  font-size: 1.1em;
  diplay: inline-block;
  width: 300px;
  margin: 10px;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  .download {
    background: ${(props) => {
      return props.darkTheme ? props.theme.body.black : props.theme.body.white;
    }};
    color: ${(props) => {
      return props.darkTheme ? props.theme.body.white : props.theme.body.black;
    }};
    border-radius: ${(props) => props.theme?.buttonRadius || 0}px;
    padding: 16px 10px 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    curson: pointer;
    transition: all 0.3s;
    &:hover {
      background: ${(props) => {
        const darkHover = props.theme.body.gray2;
        const ligthHover = props.theme.body.gray4;
        return props.darkTheme ? darkHover : ligthHover
      }};
    }
    .icon {
      margin-left: 30px;
    }
  }
`;

export const Download: React.FC<ComponentProps> = (props) => {
  const { href, fileName } = props;
  const theme = React.useContext(ThemeContext);

  const name = React.useMemo(() => {
    return fileName || href.split("/").pop();
  }, [href, fileName]);

  return (
    <StyledDiv {...props}>
      <a className="download" download href={href} target="_blank">
        <span className="name">{name}</span>
        <span className="icon">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33333 15.6665H14.6667C14.8877 15.6665 15.0996 15.7543 15.2559 15.9106C15.4122 16.0669 15.5 16.2788 15.5 16.4998C15.5 16.7209 15.4122 16.9328 15.2559 17.0891C15.0996 17.2454 14.8877 17.3332 14.6667 17.3332H1.33333C1.11232 17.3332 0.900358 17.2454 0.744078 17.0891C0.587797 16.9328 0.5 16.7209 0.5 16.4998C0.5 16.2788 0.587797 16.0669 0.744078 15.9106C0.900358 15.7543 1.11232 15.6665 1.33333 15.6665V15.6665ZM8 0.666504C7.77899 0.666504 7.56702 0.754301 7.41074 0.910582C7.25446 1.06686 7.16667 1.27882 7.16667 1.49984V11.1548L5.25583 9.244C5.17896 9.16441 5.08701 9.10093 4.98534 9.05725C4.88367 9.01358 4.77432 8.99059 4.66367 8.98963C4.55302 8.98867 4.44329 9.00975 4.34087 9.05165C4.23846 9.09355 4.14541 9.15543 4.06717 9.23368C3.98893 9.31192 3.92705 9.40496 3.88515 9.50738C3.84325 9.60979 3.82216 9.71952 3.82312 9.83017C3.82409 9.94082 3.84707 10.0502 3.89075 10.1518C3.93442 10.2535 3.99791 10.3455 4.0775 10.4223L7.41083 13.7557C7.48841 13.8329 7.58044 13.894 7.68167 13.9357C7.78245 13.978 7.89068 13.9998 8 13.9998C8.10932 13.9998 8.21755 13.978 8.31833 13.9357C8.41956 13.894 8.51159 13.8329 8.58917 13.7557L11.9225 10.4223C12.0743 10.2652 12.1583 10.0547 12.1564 9.83617C12.1545 9.61767 12.0669 9.40866 11.9123 9.25416C11.7578 9.09965 11.5488 9.01201 11.3303 9.01011C11.1118 9.00821 10.9013 9.09221 10.7442 9.244L8.83333 11.1548V1.49984C8.83333 1.27882 8.74554 1.06686 8.58926 0.910582C8.43297 0.754301 8.22101 0.666504 8 0.666504V0.666504Z"
              fill={props.darkTheme ? theme.body.white : theme.body.black}
            />
          </svg>
        </span>
      </a>
    </StyledDiv>
  );
};

const NewComponent = styled(Download)<ComponentProps>``;

export default withTheme(NewComponent);
