import * as React from "react";
import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
import { getFontFromTheme } from "../../../theme/provider";

interface IconProps {
  onClick?: (rate: number) => void;
  onMouseEnter?: (rate: number) => void;
  onMouseLeave?: (rate: number) => void;
  rate: number;
}

const RatingIconEmpty: React.FC<IconProps> = (props) => {
  const { onClick, onMouseEnter, onMouseLeave, rate } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40.074"
      height="38.272"
      viewBox="0 0 40.074 38.272"
      onClick={() => (onClick ? onClick(rate) : undefined)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(rate) : undefined)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(rate) : undefined)}
    >
      <path
        id="_2639925_star_icon"
        data-name="2639925_star_icon"
        d="M22.207,2.684l4.18,12.377,13.062.151a1.174,1.174,0,0,1,.688,2.116l-10.479,7.8L33.55,37.6a1.174,1.174,0,0,1-1.8,1.307L21.095,31.347,10.438,38.9a1.174,1.174,0,0,1-1.8-1.307l3.892-12.47-10.479-7.8a1.174,1.174,0,0,1,.688-2.116L15.8,15.059l4.18-12.377A1.175,1.175,0,0,1,22.207,2.684Z"
        transform="translate(-1.057 -1.384)"
        fill="#f8f8f8"
        stroke="#eaeaea"
        stroke-width="1"
      />
    </svg>
  );
};

const RatingIconFull: React.FC<IconProps> = (props) => {
  const { onClick, onMouseEnter, onMouseLeave, rate } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="39.036"
      height="37.241"
      viewBox="0 0 39.036 37.241"
      onClick={() => (onClick ? onClick(rate) : undefined)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(rate) : undefined)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(rate) : undefined)}
      className="filled-star-icon"
    >
      <path
        id="_2639925_star_icon"
        data-name="2639925_star_icon"
        d="M22.207,2.684l4.18,12.377,13.062.151a1.174,1.174,0,0,1,.688,2.116l-10.479,7.8L33.55,37.6a1.174,1.174,0,0,1-1.8,1.307L21.095,31.347,10.438,38.9a1.174,1.174,0,0,1-1.8-1.307l3.892-12.47-10.479-7.8a1.174,1.174,0,0,1,.688-2.116L15.8,15.059l4.18-12.377A1.175,1.175,0,0,1,22.207,2.684Z"
        transform="translate(-1.576 -1.884)"
        fill="currentColor"
      />
    </svg>
  );
};

interface StyledRating {
  size?: React.CSSProperties["fontSize"];
}

export interface RatingProps extends StyledRating, ExtendableStyledComponent {
  ratingValue: number;
  count?: number;
  label?: React.ReactNode;
  onRateClick?: (rate: number) => void;
  onIconEnter?: (rate: number) => void;
  onIconLeave?: (rate: number) => void;
}

const StyledRating = styled.span<RatingProps>`
  &.lms-rating {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
    display: inline-flex;
    align-items: center;

    .filled-star-icon {
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )};
    }
    svg {
      width: ${(props) => (props.size ? props.size : "15px")};
      height: ${(props) => (props.size ? props.size : "15px")};
      padding-right: 2px;
      color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray2)};
    }
    .label {
      margin: 0px 5px;
      font-size: 13px;
      font-weight: 700;
    }
  }
`;

export const Rating: React.FC<RatingProps> = (props) => {
  const {
    count = 5,
    ratingValue,
    // label,
    onRateClick,
    onIconEnter,
    onIconLeave,
    className = "",
  } = props;
  const startToRender = Array.from(Array(count).keys());
  return (
    <StyledRating
      size={props.count}
      ratingValue={ratingValue}
      className={`wellms-component lms-rating ${className}`}
    >
      {startToRender.map((index) => {
        return index + 1 <= Math.round(ratingValue) ? (
          <RatingIconFull
            key={index}
            rate={index + 1}
            onClick={
              onRateClick ? (rate: number) => onRateClick(rate) : undefined
            }
            onMouseEnter={
              onIconEnter ? (rate: number) => onIconEnter(rate) : undefined
            }
            onMouseLeave={
              onIconLeave ? (rate: number) => onIconLeave(rate) : undefined
            }
          />
        ) : (
          <RatingIconEmpty
            key={index}
            rate={index + 1}
            onClick={
              onRateClick ? (rate: number) => onRateClick(rate) : undefined
            }
            onMouseEnter={
              onIconEnter ? (rate: number) => onIconEnter(rate) : undefined
            }
            onMouseLeave={
              onIconLeave ? (rate: number) => onIconLeave(rate) : undefined
            }
          />
        );
      })}
      {/* {label && <span className="label">{label}</span>} */}
    </StyledRating>
  );
};
