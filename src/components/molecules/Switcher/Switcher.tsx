import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";
import { Radio } from "../../atoms/Option/Radio";

export interface SwitcherOptionProps {
  value: string;
  label: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export interface SwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SwitcherOptionProps[];
  checked: number;
}

const StyledSwitcher = styled("div")<SwitcherProps>`
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
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

const StyledSwitcherOption = styled("div")`
  position: relative;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;

  label {
    position: relative;

    &:hover span {
      opacity: 1;
    }
  }

  span {
    top: -30px;
    margin: 0;
    position: absolute;
    left: 10px;
    transform: translateX(-50%);
    color: ${(props) => {
      return props.theme.mode !== "light"
        ? props.theme.white
        : props.theme.gray1;
    }};
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  input:checked + span {
    opacity: 1;
  }

  &:last-child {
    span {
      left: auto;
      right: 0;
      transform: translateX(0);
    }
  }
`;

const SwitcherOption: React.FC<SwitcherOptionProps> = (props) => {
  const { value, label, checked } = props;

  return (
    <StyledSwitcherOption>
      <Radio
        value={value}
        checked={checked}
        label={label}
        onChange={() => props.onChange(value)}
      />
    </StyledSwitcherOption>
  );
};

export const Switcher: React.FC<SwitcherProps> = (props) => {
  const { options, checked } = props;
  const [checkedOption, setCheckedOption] = React.useState(checked || 0);

  const progressBarWidth = `${Math.round(
    ((checkedOption + 1) / options.length) * 100
  )}%`;

  return (
    <StyledSwitcher options={options} checked={checked}>
      <div className={"progress-bar"} style={{ width: progressBarWidth }} />
      {options.map((option, index) => (
        <SwitcherOption
          key={option.value}
          value={option.value}
          label={option.label}
          checked={index === checkedOption}
          onChange={() => setCheckedOption(index)}
        />
      ))}
    </StyledSwitcher>
  );
};

const NewSwitcher = styled(Switcher)<SwitcherProps>``;

export default withTheme(NewSwitcher);
