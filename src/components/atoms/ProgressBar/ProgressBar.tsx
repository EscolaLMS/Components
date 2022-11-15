import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ExtendableStyledComponent } from "types/component";
import { getFontFromTheme } from "../../../theme/provider";
import { calcPercentage, getStylesBasedOnTheme } from "../../../utils/utils";

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ExtendableStyledComponent {
  hideLabel?: boolean;
  label?: string | React.ReactNode;
  currentProgress: number;
  maxProgress: number;
}

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .progress-container {
    &:not(:last-child) {
      margin-bottom: 6px;
    }

    display: flex;
    align-items: center;
    .progress-bars {
      flex: 1;
      height: 10px;
      position: relative;
      .empty {
        display: block;
        background: ${({ theme }) =>
          getStylesBasedOnTheme(theme.mode, theme.gray2, theme.white)};
        height: 100%;
        border-radius: 10px;
      }
      .filled {
        position: absolute;
        top: 0;
        background: ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )};
        display: block;
        height: 100%;
        border-radius: 10px;
        transition: 0.2s width ease-in-out;
      }
    }
    .percentage-value {
      flex: 0 0 40px;
      font-size: 14px;
      margin-left: 5px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { t } = useTranslation();
  const {
    currentProgress,
    maxProgress,
    hideLabel,
    label = t("ProgressBar.defaultLabel"),
    className = "",
  } = props;

  const renderLabel = useCallback(() => {
    if (hideLabel) {
      return <></>;
    }
    return <div>{label}</div>;
  }, [hideLabel, label]);

  const percentageValue = useCallback(
    () => calcPercentage(currentProgress, maxProgress),
    [currentProgress, maxProgress]
  );

  return (
    <StyledDiv
      {...props}
      className={`wellms-component lms-progress-bar ${className}`}
    >
      {renderLabel()}
      <div className="progress-container">
        <span className="progress-bars">
          <span className="empty"></span>
          <span className="filled" style={{ width: percentageValue() }}></span>
        </span>
        <span className="percentage-value">{percentageValue()}</span>
      </div>
    </StyledDiv>
  );
};
