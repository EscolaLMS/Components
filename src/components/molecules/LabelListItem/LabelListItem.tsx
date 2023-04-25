import * as React from "react";
import type { PropsWithChildren } from "react";
import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { IconTitle } from "../../atoms/IconTitle/IconTitle";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface TitleProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "title">,
    ExtendableStyledComponent {
  variant?: "header" | "label";
  icon?: React.ReactNode;
  mobile?: boolean;
  title?: React.ReactNode;
}

const StyledLabelListItem = styled("div")<TitleProps>`
  margin-bottom: 20px;

  .lms-icon-title {
    margin-bottom: 5px;
  }
`;

export const LabelListItem: React.FC<PropsWithChildren<TitleProps>> = (
  props
) => {
  const {
    children,
    variant = "header",
    title,
    icon,
    mobile = false,
    className = "",
  } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledLabelListItem className={`wellms-component ${className}`}>
      {variant === "header" ? (
        <React.Fragment>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <IconTitle
                level={mobile ? 5 : 4}
                title={typeof title === "string" ? title : ""}
                icon={icon}
                as={"h1"}
              />
            ))}
          <Text
            noMargin={true}
            size={mobile ? "12" : "14"}
            style={{
              marginLeft: mobile ? "24px" : "0",
            }}
          >
            {children}
          </Text>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text
            style={{
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
            size={"12"}
          >
            {title}
          </Text>
          <Title
            level={5}
            style={{
              marginBottom: "0",
              color: getStylesBasedOnTheme(
                theme.mode,
                theme.dm__primaryColor,
                theme.primaryColor,
                theme.primaryColor
              ),
            }}
            as={"h1"}
          >
            {children}
          </Title>
        </React.Fragment>
      )}
    </StyledLabelListItem>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(LabelListItem)<TitleProps>``;

// Main button with styles
export default withTheme(NewComponent);
