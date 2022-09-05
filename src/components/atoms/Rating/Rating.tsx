import * as React from "react";
import styled from "styled-components";
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
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => (onClick ? onClick(rate) : undefined)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(rate) : undefined)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(rate) : undefined)}
    >
      <path
        d="M8.00002 0.270996C8.2841 0.270996 8.5438 0.431498 8.67084 0.685586L10.605 4.55394L14.858 5.17256C15.1405 5.21364 15.3751 5.41151 15.4633 5.68299C15.5515 5.95447 15.478 6.25248 15.2736 6.45175L12.1783 9.46971L12.8746 13.7249C12.9206 14.0061 12.8032 14.2891 12.5717 14.4553C12.3403 14.6214 12.0346 14.6421 11.7829 14.5085L8.00002 12.5013L4.21718 14.5085C3.96546 14.6421 3.65979 14.6214 3.4283 14.4553C3.1968 14.2891 3.07947 14.0061 3.12549 13.7249L3.82179 9.46971L0.726447 6.45175C0.522068 6.25248 0.448522 5.95447 0.536727 5.68299C0.624932 5.41151 0.859594 5.21364 1.14207 5.17256L5.39502 4.55394L7.3292 0.685586C7.45625 0.431498 7.71594 0.270996 8.00002 0.270996ZM8.00002 2.69805L6.56147 5.57516C6.45171 5.79468 6.24148 5.94661 5.9986 5.98194L2.86131 6.43827L5.1486 8.66837C5.32386 8.83925 5.40471 9.08492 5.36518 9.32649L4.85003 12.4746L7.64849 10.9897C7.86833 10.8731 8.13172 10.8731 8.35156 10.9897L11.15 12.4746L10.6349 9.32649C10.5953 9.08492 10.6762 8.83925 10.8514 8.66837L13.1387 6.43827L10.0014 5.98194C9.75856 5.94661 9.54834 5.79468 9.43858 5.57516L8.00002 2.69805Z"
        fill="currentColor"
      />
    </svg>
  );
};

const RatingIconFull: React.FC<IconProps> = (props) => {
  const { onClick, onMouseEnter, onMouseLeave, rate } = props;
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => (onClick ? onClick(rate) : undefined)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(rate) : undefined)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(rate) : undefined)}
      className="filled-star-icon"
    >
      <path
        d="M8.00002 0.0209961C8.2841 0.0209961 8.5438 0.181498 8.67084 0.435586L10.605 4.30394L14.858 4.92256C15.1405 4.96364 15.3751 5.16151 15.4633 5.43299C15.5515 5.70447 15.478 6.00248 15.2736 6.20175L12.1783 9.21971L12.8746 13.4749C12.9206 13.7561 12.8032 14.0391 12.5717 14.2053C12.3403 14.3714 12.0346 14.3921 11.7829 14.2585L8.00002 12.2513L4.21718 14.2585C3.96546 14.3921 3.65979 14.3714 3.4283 14.2053C3.1968 14.0391 3.07947 13.7561 3.12549 13.4749L3.82179 9.21971L0.726447 6.20175C0.522068 6.00248 0.448522 5.70447 0.536727 5.43299C0.624932 5.16151 0.859594 4.96364 1.14207 4.92256L5.39502 4.30394L7.3292 0.435586C7.45625 0.181498 7.71594 0.0209961 8.00002 0.0209961Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface StyledRating {
  size?: React.CSSProperties["fontSize"];
}

export interface RatingProps extends StyledRating {
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
      color: ${({ theme }) => theme.primaryColor};
    }
    svg {
      font-size: ${(props) => (props.size ? props.size : "15px")};
      padding-right: 2px;
      color: ${({ theme }) =>
        theme.mode === "dark" ? theme.white : theme.gray1};
    }
    .label {
      min-width: 48px;
      margin-left: 5px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

export const Rating: React.FC<RatingProps> = (props) => {
  const {
    count = 5,
    ratingValue,
    label,
    onRateClick,
    onIconEnter,
    onIconLeave,
  } = props;
  const startToRender = Array.from(Array(count).keys());
  return (
    <StyledRating
      size={props.size}
      ratingValue={ratingValue}
      className="lms-rating"
    >
      <>
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
        {label && <span className="label">{label}</span>}
      </>
    </StyledRating>
  );
};
