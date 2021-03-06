import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode } from "react";
import chroma from "chroma-js";

interface StyledPricingCardProps {
  mobile?: boolean;
  free?: boolean;
}

export interface PricingCardProps extends StyledPricingCardProps {
  children: ReactNode;
}

const StyledPricingCard = styled("div")<StyledPricingCardProps>`
  padding: ${(props) => (props.mobile ? "10px 16px" : "40px")};
  box-shadow: ${(props) =>
    props.mobile ? "0px -2px 15px 0px rgba(0, 0, 0, .1);" : "none"};
  border-radius: ${({ theme }) => theme.cardRadius}px;
  background-color: ${({ theme, mobile }) =>
    mobile
      ? theme.mode === "light"
        ? theme.backgroundLight
        : theme.backgroundDark
      : theme.mode === "light"
      ? theme.cardBackgroundColorDark
      : theme.cardBackgroundColorLight};

  .pricing-card-price {
    margin-top: 10px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

  .pricing-card-discount {
    margin-left: ${(props) => (props.mobile ? "0" : "15px")};
    text-decoration: ${(props) => (props.free ? "none" : "line-through")};
    &,
    & > * {
      color: ${({ theme }) =>
        theme.mode === "light" ? theme.primaryColor : ""};
    }
  }

  svg path {
    fill: ${({ theme }) => (theme.mode === "light" ? "" : theme.white)};
  }

  button ~ p {
    margin-top: 20px;
  }

  .pricing-card-features {
    margin-top: 20px;

    &:after {
      content: "";
      display: block;
      margin-bottom: 20px;
      width: 24px;
      height: 1px;
      background-color: ${({ theme }) =>
        theme.mode === "light" ? theme.gray1 : "transparent"};
    }
  }

  .pricing-card-footer {
    margin-top: 7px;
    display: flex;
    padding-top: 10px;
    border-top: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? theme.gray4
          : chroma(theme.backgroundDark).brighten(1).hex()};

    > div:first-child {
      width: 30%;
      flex-shrink: 0;
    }

    > div:last-child {
      flex: 1;
    }
  }
`;

export const PricingCard: React.FC<PricingCardProps> = (props) => {
  const { children, mobile, free } = props;

  return (
    <StyledPricingCard mobile={mobile} free={free}>
      {children}
    </StyledPricingCard>
  );
};

const NewPricingCard = styled(PricingCard)<PricingCardProps>``;

export default withTheme(NewPricingCard);
