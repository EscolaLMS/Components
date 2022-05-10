import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { default as chroma } from "chroma-js";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  mode?: "primary" | "secondary" | "outline";
  loading?: boolean;
  block?: boolean;
}

const LoadingIcon: React.FC<{ color?: string }> = ({ color = "#fff" }) => {
  const rndId = React.useMemo(
    () => `svg-def-${Math.round(Math.random() * 99999)}`,
    []
  );
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="8.042%"
          y1="0%"
          x2="65.682%"
          y2="23.865%"
          id={rndId}
        >
          <stop stopColor={color} stopOpacity="0" offset="0%" />
          <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={color} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke={`url(#${rndId})`}
            strokeWidth="3"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill={color} cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

// Main button with styles
const StyledButton = styled("button")<ButtonProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => {
    if (props.mode === "outline") {
      return "transparent";
    }
    return props.theme?.primaryColor || "black";
  }};
  color: ${(props) => {
    if (props.mode === "outline") {
      return props.theme.mode === "light" ? "#4A4A4A" : "#fff";
    }
    return "#fff";
  }};
  font-family: ${(props) =>
    props.theme ? getFontFromTheme(props.theme).fontFamily : "sans-serif"};
  font-weight: bold;
  font-size: ${(props) => {
    if (props.mode) {
      switch (props.mode) {
        case "primary":
          return "18px";
        case "secondary":
        case "outline":
        default:
          return "14px";
      }
    }
    return "18px";
  }};
  line-height: 1.55em;
  cursor: pointer;
  border: none;
  padding: ${(props) =>
    props.mode === "primary" ? "0.75em 2em" : "0.65em 1.3em"};
  border-radius: ${(props) => props.theme?.buttonRadius || 2}px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: 2px solid
    ${(props) => {
      if (props.mode === "outline") {
        return "transparent";
      }
      return props.theme?.primaryColor || "black";
    }};
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${(props) => (props.block ? "width:100%;" : "")}

  pointer-events: ${(props) => {
    if (props.loading) {
      return "none";
    }
    return "auto";
  }};

  & > svg {
    margin: 0 9px;
    height: ${(props) => {
      if (props.mode) {
        switch (props.mode) {
          case "primary":
            return "18px";
          case "secondary":
          case "outline":
          default:
            return "14px";
        }
      }
      return "18px";
    }};
    width: auto;
  }

  &:disabled {
    cursor: not-allowed;
    background: rgba(${chroma("#4a4a4a").rgb().join(",")}, 0.2);
    &,
    &:hover,
    &:focus,
    &:active {
      border: 2px solid rgba(0, 0, 0, 0);
      box-shadow: none !important;
    }
  }

  &:focus,
  &:active {
    border: 2px solid #fff;
    box-shadow: none !important;
    ${(props) => {
      if (props.mode === "outline") {
        return props.theme.mode === "light"
          ? "border: 2px solid #4A4A4A;"
          : "border: 2px solid #fff;";
      }
      return "";
    }};
  }

  &:hover {
    box-shadow: 0px 0px 10px
      rgba(
        ${(props) =>
          props.theme && props.theme.primaryColor
            ? chroma(props.theme.primaryColor).rgb().join(",") || "0, 0, 0"
            : "0, 0, 0"},
        0.5
      );
    ${(props) => {
      if (props.mode === "outline") {
        return `box-shadow:none;
        text-decoration:underline;
        `;
      }
      return "";
    }};
    ${(props) => {
      if (props.mode === "outline") {
        return props.theme.mode === "light"
          ? "border: 2px solid rgba(74,74,74,0.5);"
          : "border: 2px solid rgba(255,255,255,0.5);";
      }
      return "";
    }}
  }
`;

// Main button with styles
export const Button: React.FC<ButtonProps> = ({
  children,
  mode = "primary",
  loading = false,
  block = false,
  ...props
}) => {
  const theme = React.useContext(ThemeContext);

  const loadingColor = React.useMemo(() => {
    if (theme && theme.mode === "light" && mode === "outline") {
      return "#4A4A4A";
    }
    return "#fff";
  }, [mode, theme]);
  return (
    <StyledButton mode={mode} loading={loading} block={block} {...props}>
      {loading && <LoadingIcon color={loadingColor} />}
      {children}
    </StyledButton>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewButton = styled(Button)<{ mode: string }>``;

// Main button with styles
export default withTheme(NewButton);
