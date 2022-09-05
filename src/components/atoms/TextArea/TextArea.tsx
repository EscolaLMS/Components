import { mix } from "chroma-js";
import * as React from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";

const notTextAreaProps = {
  theme: undefined,
  label: undefined,
  helper: undefined,
  error: undefined,
};

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactNode;
  helper?: React.ReactNode;
  error?: string | React.ReactNode;
}

const StyledTextArea = styled("div")<TextAreaProps>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: 14px;
  position: relative;
  width: 100%;

  * {
    outline: none;
    box-sizing: content-box;
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
  textarea {
    box-sizing: border-box;
    resize: none;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
    font-size: 14px;
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
    border: ${(props) => {
      const { mode, gray4, gray5 } = props.theme;
      let borderColor = mode !== "dark" ? gray4 : gray5;
      if (props.error) {
        borderColor = props.theme.errorColor;
      }
      return `1px solid ${borderColor}`;
    }};
    &:disabled {
      cursor: not-allowed;
    }
  }
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

      return props.theme.mode === "dark"
        ? props.theme.white
        : props.theme.gray1;
    }};
  }
  .textarea-container {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    &.filled,
    &:focus-within {
      label {
        transform: translate(12px, -7px) scale(0.75);
        ${(props) => {
          const backgroundLabel =
            props.theme.mode === "dark" ? props.theme.black : props.theme.white;
          return `
            background: ${backgroundLabel};
            box-shadow: -5px 0px 0px 0px ${backgroundLabel}, 5px 0px 0px 0px ${backgroundLabel};
          `;
        }}
      }
      textarea {
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
`;

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const { label, required, disabled, error, helper } = props;
  const generateRandomTextAreatId = useMemo(() => {
    const randomString = (Math.random() + 1).toString(36).substring(3);
    return `lms-textarea-id-${randomString}`;
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
        <label htmlFor={generateRandomTextAreatId}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      );
    }
    return <></>;
  }, [generateRandomTextAreatId, label, required]);

  return (
    <StyledTextArea
      disabled={disabled}
      error={error}
      required={required}
      className={`lsm-input ${helper ? "has-helper" : ""} ${
        error ? "has-error" : ""
      } `}
    >
      <div className={`textarea-container ${addFilledClass()}`}>
        {renderLabel()}
        <textarea
          {...props}
          {...notTextAreaProps}
          id={label ? generateRandomTextAreatId : undefined}
        >
          {props.value}
        </textarea>
        {helper && <span>{helper}</span>}
        {error && <div className="error">{error}</div>}
      </div>
    </StyledTextArea>
  );
};
