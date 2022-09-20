import { mix } from "chroma-js";
import * as React from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
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
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__cardBackgroundColor,
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
        theme.errorColor
      )};
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
      const { mode, gray1, gray5, inputDisabledBg, dm__inputDisabledBg } =
        props.theme;
      if (props.disabled) {
        if (props.theme?.inputDisabledBg) {
          return getStylesBasedOnTheme(
            mode,
            inputDisabledBg,
            dm__inputDisabledBg,
            gray1
          );
        }
        return mix(gray1, "#fff").hex();
      }
      return getStylesBasedOnTheme(mode, gray1, gray5);
    }};
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
    border: ${(props) => {
      const { mode, gray4, gray5, errorColor, dm__cardBackgroundColor } =
        props.theme;
      let borderColor = getStylesBasedOnTheme(mode, gray5, gray4);
      if (props.error) {
        borderColor = getStylesBasedOnTheme(
          mode,
          dm__cardBackgroundColor,
          errorColor
        );
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
    color: ${({ theme, error }) => {
      if (error) {
        return getStylesBasedOnTheme(
          theme.mode,
          theme.dm__cardBackgroundColor,
          theme.errorColor
        );
      }
      return getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1);
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
      textarea {
        border-color: ${({ error, theme, disabled }) => {
          if (error) {
            return getStylesBasedOnTheme(
              theme.mode,
              theme.dm__cardBackgroundColor,
              theme.errorColor
            );
          }
          if (disabled) {
            return "transparent;";
          }
          return getStylesBasedOnTheme(theme.mode, undefined, theme.gray3, "");
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
      className={`wellms-component lsm-input ${helper ? "has-helper" : ""} ${
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
