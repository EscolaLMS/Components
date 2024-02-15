import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode } from "react";
import { Title } from "../../atoms/Typography/Title";
import { Button } from "../../atoms/Button/Button";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface StyledCategoryCardProps {
  mobile?: boolean;
  variant: "solid" | "gradient";
}

const StyledCategoryCard = styled("div")<StyledCategoryCardProps>`
  text-align: center;
  padding: ${({ variant, mobile }) =>
    variant === "solid"
      ? "78px 8px 72px"
      : mobile
      ? "75px 8px 97px"
      : "15px 28px 34px 38px"};
  border-radius: ${({ theme }) => theme.buttonRadius}px;
  background: ${({ theme, variant }) =>
    variant === "gradient"
      ? "#F7F7F7"
      : getStylesBasedOnTheme(
          theme.mode,
          theme.dm__cardBackgroundColor,
          theme.cardBackgroundColor
        )};

  .category-card-title {
    margin-top: 34px;
    margin-bottom: 26px;
    font-size: 20px;
  }

  .category-card-icon {
    svg path {
      fill: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
    }
  }
  button {
    display: flex;
    align-items: center;
    margin: 0 auto;
    * {
      margin: 0px;
      color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.white)};
      font-weight: 400;
      font-size: 16px;
    }

    svg {
      width: 11px;
      height: 11px;
      path {
        fill: ${({ theme }) =>
          getStylesBasedOnTheme(theme.mode, theme.white, theme.white)};
      }
    }
  }
`;
export interface CategoryCardProps
  extends StyledCategoryCardProps,
    ExtendableStyledComponent {
  icon: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const {
    icon,
    title,
    subtitle,

    onButtonClick,
    variant,
    mobile = false,
    className = "",
  } = props;
  return (
    <StyledCategoryCard
      className={`wellms-component ${className}`}
      mobile={mobile}
      variant={variant}
    >
      <div className={"category-card-icon"}>{icon}</div>
      <Title as={"h4"} level={3} className={"category-card-title"}>
        {title}
      </Title>

      <Button
        mode={"secondary"}
        onClick={onButtonClick}
        style={{
          marginTop: "6px",
        }}
      >
        {subtitle}
      </Button>
    </StyledCategoryCard>
  );
};

const NewCategoryCard = styled(CategoryCard)<CategoryCardProps>``;

export default withTheme(NewCategoryCard);
