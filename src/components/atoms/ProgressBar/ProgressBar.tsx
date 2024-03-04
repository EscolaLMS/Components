import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ExtendableStyledComponent } from "types/component";
import { getFontFromTheme } from "../../../theme/provider";
import { calcPercentage, getStylesBasedOnTheme } from "../../../utils/utils";

const VariantTypes = {
  ROUNDED: "rounded",
  SQUARE: "square",
} as const;

type VariantTypeProp = typeof VariantTypes[keyof typeof VariantTypes];

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ExtendableStyledComponent {
  variant?: VariantTypeProp;
  hideLabel?: boolean;
  label?: string | React.ReactNode;
  currentProgress: number;
  maxProgress: number;
}

const StyledDiv = styled.div<{ $variant?: VariantTypeProp }>`
  margin: 0;
  padding: 0;
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 4px;

    .label-value {
      width: 95%;
      font-size: 13px;
    }

    .percentage-value {
      font-size: 13px;
      margin-left: auto;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: ${({ $variant }) => $variant === VariantTypes.SQUARE ? 'bold' : 'normal'};
      width: 5%;
    }
  }

  .progress-container {

    &:not(:last-child) {
      margin-bottom: 6px;
    }

    display: flex;
    align-items: center;
    .progress-bars {
      flex: 1;
      height: ${({ $variant }) => $variant === VariantTypes.SQUARE ? '3px' : '6px'};
      position: relative;
      .empty {
        display: block;
        background: ${({ theme }) => theme.positive2};
        height: 100%;
        border-radius: ${({ $variant }) => $variant === VariantTypes.ROUNDED ? '5px' : ''};
      }
      .filled {
        position: absolute;
        top: 0;
        background: ${({ theme: { positive } }) => positive};
        display: block;
        height: 100%;
        transition: 0.2s width ease-in-out;
        border-radius: ${({ $variant }) => $variant === VariantTypes.ROUNDED ? '5px' : ''};
      }
    }
  }
`;

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { t } = useTranslation();
  const {
    variant = VariantTypes.ROUNDED,
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
    return <div className="label-value">{label}</div>;
  }, [hideLabel, label]);

  const percentageValue = useCallback(
    () => calcPercentage(currentProgress, maxProgress),
    [currentProgress, maxProgress]
  );

  return (
    <StyledDiv
      {...props}
      className={`wellms-component lms-progress-bar ${className}`}
      $variant={variant}
    >
      <div className="label-container">
        {renderLabel()}
        <span className="percentage-value">{percentageValue()}</span>
      </div>
      <div className="progress-container">
        <span className="progress-bars">
          <span className="empty"></span>
          <span className="filled" style={{ width: percentageValue() }}></span>
        </span>
      </div>
    </StyledDiv>
  );
};
