import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { IconTitle } from "../IconTitle/IconTitle";

export interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  variant?: "header" | "label";
  icon?: React.ReactNode;
}

const StyledLabelListItem = styled("div")<TitleProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  .lms-icon-title {
    margin-bottom: 5px;
  }
`;

export const LabelListItem: React.FC<TitleProps> = (props) => {
  const { children, variant = "header", title, icon } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledLabelListItem>
      {variant === "header" ? (
        <React.Fragment>
          {title && <IconTitle level={4} title={title} icon={icon} as={"h4"} />}
          <Text noMargin={true}>{children}</Text>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text
            style={{
              textTransform: "uppercase",
              marginBottom: "8px",
              fontSize: "12px",
            }}
          >
            {title}
          </Text>
          <Title
            level={4}
            style={{
              marginBottom: "0",
              color: theme.primaryColor,
            }}
            as={"h4"}
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
