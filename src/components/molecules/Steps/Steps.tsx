import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
import { Radio } from "../../atoms/Option/Radio";

export interface StepsOptionProps extends ExtendableStyledComponent {
  value: string;
  label: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export interface StepsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ExtendableStyledComponent {
  options: StepsOptionProps[];
  checked: number;
}

const StyledSteps = styled("div")<StepsProps>`
  position: relative;
  display: flex;
  width: 100%;

  &:before {
    width: 100%;
    background-color: ${({ theme }) => theme.gray3};
  }

  &:before,
  .progress-bar {
    position: absolute;
    left: 0;
    bottom: 13px;
    content: "";
    display: block;
    height: 1px;
  }

  .progress-bar {
    transition: width 0.2s ease-in-out;
    background-color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
  }
`;

const StyledStepsOption = styled("div")`
  position: relative;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;

  span {
    top: -30px;
    margin: 0;
    position: absolute;
    left: 10px;
    transform: translateX(-50%);
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:last-child {
    span {
      left: auto;
      right: 0;
      transform: translateX(0);
    }
  }
  label {
    position: relative;

    &:hover span {
      opacity: 1;
    }
  }

  input:checked + span {
    opacity: 1;
  }
`;

const StepsOption: React.FC<StepsOptionProps> = (props) => {
  const { value, label, checked, className = "" } = props;

  return (
    <StyledStepsOption className={`wellms-component ${className}`}>
      <Radio
        value={value}
        checked={checked}
        label={label}
        onChange={() => props.onChange(value)}
      />
    </StyledStepsOption>
  );
};

export const Steps: React.FC<StepsProps> = (props) => {
  const { options, checked, className = "" } = props;
  const [checkedOption, setCheckedOption] = React.useState(checked || 0);

  const progressBarWidth = `${Math.round(
    ((checkedOption + 1) / options.length) * 100
  )}%`;

  return (
    <StyledSteps
      className={`wellms-component ${className}`}
      options={options}
      checked={checked}
    >
      <div className={"progress-bar"} style={{ width: progressBarWidth }} />
      {options.map((option, index) => (
        <StepsOption
          key={option.value}
          value={option.value}
          label={option.label}
          checked={index === checkedOption}
          onChange={() => setCheckedOption(index)}
        />
      ))}
    </StyledSteps>
  );
};

const NewSteps = styled(Steps)<StepsProps>``;

export default withTheme(NewSteps);
