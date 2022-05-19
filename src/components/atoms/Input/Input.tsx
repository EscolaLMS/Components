import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { useMemo, useCallback } from "react";
import { mix } from "chroma-js";

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
    * {
      outline: none;
    }
    .error {
      color: ${(props) => props.theme.errorColor};
      padding-left: 12px;
      font-size: 12px;
      line-height: 15px;
    }
    .required {
      color: ${(props) => props.theme.errorColor};
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
          const { mode, gray1, gray5 } = props.theme;
          if (props.disabled) {
            return mix(gray1, "#fff").hex();
          }
          return mode !== "dark" ? gray5 : gray1;
        }};
        color: ${(props) =>
          props.theme.mode !== "dark" ? props.theme.gray1 : props.theme.white};
        &:disabled {
          cursor: not-allowed;
        }
      }
      fieldset {
        position: absolute;
        inset: ${({ label }) => {
          return `${label ? "-5px " : "0 "} 0 0`;
        }};
        margin: 0px;
        padding: 0px 8px;
        border: ${(props) => {
          const { mode, gray4, gray5 } = props.theme;
          let borderColor = mode !== "dark" ? gray4 : gray5;
          if (props.error) {
            borderColor = props.theme.errorColor;
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
        z-index: 1;
        transition: 0.2s all;
        color: ${(props) => {
          if (props.error) {
            return props.theme.errorColor;
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
          ${(props) => {
            const backgroundLabel =
              props.theme.mode === "dark"
                ? props.theme.black
                : props.theme.white;
            return `
              background: ${backgroundLabel};
              box-shadow: -5px 0px 0px 0px ${backgroundLabel}, 5px 0px 0px 0px ${backgroundLabel};
            `;
          }}
        }
        input {
          background: ${(props) => {
            if (props.disabled) {
              return "";
            }
            props.theme.mode === "dark" ? props.theme.white : undefined;
          }};
        }
        fieldset {
          border-color: ${(props) => {
            if (props.error) {
              return props.theme.errorColor;
            }
            if (props.disabled) {
              return "transparent;";
            }
            return props.theme.mode !== "dark" ? props.theme.gray3 : undefined;
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
      className={`lsm-input ${helper ? "has-helper" : ""} ${
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
          <fieldset>
            {label && (
              <legend>
                {label}
                {required ? "*" : ""}
              </legend>
            )}
          </fieldset>
        </div>
      </div>
      {helper && <span>{helper}</span>}
      {error && <div className="error">{error}</div>}
    </StyledDiv>
  );
};

const NewInput = styled(Input)<InputProps>``;

export default withTheme(NewInput);
