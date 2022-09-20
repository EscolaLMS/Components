import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode } from "react";
import { Title } from "../../atoms/Typography/Title";
import { Button } from "../../atoms/Button/Button";
import chroma from "chroma-js";
import { getStylesBasedOnTheme } from "../../../utils/utils";

interface StyledCategoryCardProps {
  mobile?: boolean;
  variant: "solid" | "gradient";
}

export interface CategoryCardProps extends StyledCategoryCardProps {
  icon: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const StyledCategoryCard = styled("div")<StyledCategoryCardProps>`
    text-align: center;
    padding: ${({ variant, mobile }) =>
      variant === "solid"
        ? "78px 8px 72px"
        : mobile
        ? "75px 8px 97px"
        : "75px 8px 208px"};
    border-radius: ${({ theme }) => theme.cardRadius}px;
    background: ${({ theme, variant }) =>
      variant === "gradient"
        ? `linear-gradient(180deg, ${
            theme.mode === "light"
              ? chroma(theme.background).darken(0.2).hex()
              : chroma(theme.dm__background).brighten(1).hex()
          } 0%, transparent 100%)`
        : getStylesBasedOnTheme(
            theme.mode,
            theme.dm__background,
            theme.background
          )};

    .category-card-title {
      margin-top: 34px;
      margin-bottom: 26px;
    }

    .category-card-icon {
      svg path {
        fill: ${({ theme }) =>
          getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
      }
    }

    .category-card-children {
      display: flex;
      justify-content: center;

      svg {
        fill: none;
        path {
          stroke: currentColor;
        }
      }
    }
  `;
  const {
    icon,
    title,
    subtitle,
    buttonText,
    onButtonClick,
    variant,
    mobile = false,
  } = props;
  return (
    <StyledCategoryCard
      className="wellms-component"
      mobile={mobile}
      variant={variant}
    >
      <div className={"category-card-icon"}>{icon}</div>
      <Title as={"h4"} level={4} className={"category-card-title"}>
        {title}
      </Title>
      <div className={"category-card-children"}>{subtitle}</div>
      <Button
        mode={"secondary"}
        onClick={onButtonClick}
        style={{
          marginTop: "6px",
        }}
      >
        {buttonText}
      </Button>
    </StyledCategoryCard>
  );
};

const NewCategoryCard = styled(CategoryCard)<CategoryCardProps>``;

export default withTheme(NewCategoryCard);
