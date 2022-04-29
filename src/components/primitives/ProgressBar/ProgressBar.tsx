import * as React from "react";
import { useCallback } from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  hideLabel?: boolean;
  label?: string | React.ReactNode;
  currentProgress: number;
  maxProgress: number;
}

const StyledDiv = styled.div<{}>`
  margin: 0;
  padding: 0;
  color: ${(props) =>
    props.theme.mode !== "dark"
      ? props.theme.body.gray1
      : props.theme.body.white};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .progress-container {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    .progress-bars {
      flex: 1;
      height: 10px;
      position: relative;
      .empty {
        display: block;
        background: ${(props) => {
          return props.theme.mode !== "dark"
            ? props.theme.body.white
            : props.theme.body.gray2;
        }};
        height: 100%;
        border-radius: 10px;
      }
      .filled {
        position: absolute;
        top: 0;
        background: ${(props) =>
          props.theme.mode === "dark"
            ? props.theme.backgroundDarkProgress
            : props.theme.primaryColor};
        display: block;
        height: 100%;
        border-radius: 10px;
        transition: 0.2s width;
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
  const { currentProgress, maxProgress, hideLabel, label = "Progress" } = props;

  const renderLabel = useCallback(() => {
    if (hideLabel) {
      return <></>;
    }
    return <div>{label}</div>;
  }, [hideLabel, label]);

  const percentageValue = useCallback(() => {
    if (maxProgress === 0) {
      return "0%";
    }
    if (currentProgress >= maxProgress) {
      return "100%";
    }
    return `${Math.round((currentProgress / maxProgress) * 100)}%`;
  }, [currentProgress, maxProgress]);

  return (
    <StyledDiv {...props} className={`lms-progress-bar ${props.className}`}>
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

// https://styled-components.com/docs/api#using-custom-props
const NewProgressBar = styled(ProgressBar)<{}>``;

export default withTheme(NewProgressBar);
