import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { useMemo, useCallback } from "react";
import { mix } from "chroma-js";
import { getStylesBasedOnTheme } from "../../../utils/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | React.ReactNode;
  helper?: React.ReactNode;
  error?: string | React.ReactNode;
  container?: React.HTMLAttributes<HTMLDivElement>;
  type: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
}

const notInputProps = {
  theme: undefined,
  container: undefined,
  label: undefined,
  helper: undefined,
  error: undefined,
};

const StyledDiv = styled("div")<InputProps>`
  &.lsm-input {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.dm__textColor, theme.textColor)};
    * {
      outline: none;
    }
    .error {
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__cardBackgroundColor,
          theme.errorColor,
          theme.errorColor
        )};
      padding-left: 12px;
      font-size: 12px;
      line-height: 15px;
    }
    .required {
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__cardBackgroundColor,
          theme.errorColor,
          theme.errorColor
        )};
    }

    .helper {
      font-size: 12px;
    }

    .input-and-fieldset {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      position: relative;
      input {
        font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
        border: 0px;
        font-size: 14px;
        box-sizing: content-box;
        display: block;
        width: 100%;
        padding: 11px 12px 13px;
        caret-color: #e60037;
        border-radius: ${(props) => props.theme.inputRadius}px;
        background: ${(props) => {
          const { mode, gray1, gray5, inputDisabledBg, dm__inputDisabledBg } =
            props.theme;
          if (props.disabled) {
            return getStylesBasedOnTheme(
              mode,
              dm__inputDisabledBg,
              inputDisabledBg,
              mix(gray1, "#fff").hex()
            );
          }
          return getStylesBasedOnTheme(mode, gray1, gray5);
        }};
        color: ${({ theme, disabled }) => {
          if (disabled) {
            return "white";

            return getStylesBasedOnTheme(
              theme.mode,
              theme.dm__inputDisabledBg ?? theme.black,
              theme.inputDisabledBg ?? theme.gray5,
              theme.gray1
            );
          }
          return getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1);
        }};
        &:disabled {
          cursor: not-allowed;
        }
      }
      .fieldset {
        position: absolute;
        inset: ${({ label }) => {
          return `${label ? "-5px " : "0 "} 0 0`;
        }};
        margin: 0px;
        padding: 0px 8px;
        border: ${(props) => {
          const {
            mode,
            gray4,
            gray5,
            dm__cardBackgroundColor,
            cardBackgroundColor,
            errorColor,
          } = props.theme;
          let borderColor = getStylesBasedOnTheme(mode, gray5, gray4);
          if (props.error) {
            borderColor = getStylesBasedOnTheme(
              mode,
              dm__cardBackgroundColor,
              cardBackgroundColor,
              errorColor
            );
          }
          return `1px solid ${borderColor}`;
        }};
        pointer-events: none;
        overflow: hidden;
        border-radius: ${(props) => props.theme.inputRadius}px;
        legend {
          overflow: hidden;
          display: block;
          width: 0;
          height: 11px;
          font-size: 0.75em;
          visibility: hidden;
          padding: 0;
        }
      }
    }

    .input-container {
      display: inline-flex;
      flex-direction: column;
      position: relative;
      width: 100%;

      label {
        pointer-events: none;
        transform-origin: left top;
        max-width: calc(100% - 24px);
        position: absolute;
        left: 0px;
        top: 0px;
        transform: translate(12px, 12px) scale(1);
        font-size: 12px;
        z-index: 1;
        transition: 0.2s all;
        color: ${({ theme, error }) => {
          if (error) {
            return getStylesBasedOnTheme(
              theme.mode,
              theme.dm__errorColor,
              theme.errorColor,
              theme.errorColor
            );
          }
        }};
      }

      &.filled,
      &:focus-within {
        legend {
          width: auto;
          margin-left: -2px;
          padding-right: 10px;
        }
        label {
          transform: translate(12px, -7px) scale(0.75);
          ${({ theme }) => {
            const backgroundLabel = getStylesBasedOnTheme(
              theme.mode,
              theme.black,
              theme.white
            );
            return `
              background: ${backgroundLabel};
              box-shadow: -5px 0px 0px 0px ${backgroundLabel}, 5px 0px 0px 0px ${backgroundLabel};
            `;
          }}
        }
        input {
          background: ${({ theme, disabled }) => {
            if (disabled) {
              return "";
            }
            return getStylesBasedOnTheme(
              theme.mode,
              theme.white,
              undefined,
              ""
            );
          }};
        }
        .fieldset {
          border-color: ${(props) => {
            if (props.error) {
              return props.theme.errorColor;
            }
            if (props.disabled) {
              return "transparent;";
            }
            return getStylesBasedOnTheme(
              props.theme.mode,
              props.theme.gray3,
              undefined,
              ""
            );
          }};
        }
      }
    }
  }
`;

export const Input: React.FC<InputProps> = (props) => {
  const { label, helper, container, error, required } = props;

  const generateRandomInputId = useMemo(() => {
    const randomString = (Math.random() + 1).toString(36).substring(3);
    return `lms-input-id-${randomString}`;
  }, []);

  const addFilledClass = useCallback(() => {
    const { value, placeholder } = props;
    if ((value && value !== "") || (placeholder && placeholder !== "")) {
      return "filled";
    }
    return "";
  }, [props.value, props.placeholder]);

  const renderLabel = useCallback(() => {
    if (label) {
      return (
        <label htmlFor={generateRandomInputId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      );
    }
    return <></>;
  }, [generateRandomInputId, label, required]);

  return (
    <StyledDiv
      {...container}
      error={props.error}
      disabled={props.disabled}
      required={required}
      label={label}
      className={`wellms-component lsm-input ${helper ? "has-helper" : ""} ${
        error ? "has-error" : ""
      } ${container?.className ? container.className : ""}`}
      type={props.type}
    >
      <div className={`input-container ${addFilledClass()}`}>
        {renderLabel()}
        <div className="input-and-fieldset">
          <input
            {...props}
            {...notInputProps}
            id={label ? generateRandomInputId : undefined}
          />
          {label ? (
            <fieldset className="fieldset">
              <legend>
                {label}
                {required ? "*" : ""}
              </legend>
            </fieldset>
          ) : (
            <span className="fieldset"></span>
          )}
        </div>
      </div>
      {helper && <span className="helper">{helper}</span>}
      {error && <div className="error">{error}</div>}
    </StyledDiv>
  );
};

const NewInput = styled(Input)<InputProps>``;

export default withTheme(NewInput);
