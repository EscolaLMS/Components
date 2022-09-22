import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { IconTitle } from "../../atoms/IconTitle/IconTitle";

export interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  variant?: "header" | "label";
  icon?: React.ReactNode;
  mobile?: boolean;
  titleTag?: keyof JSX.IntrinsicElements;
}

const StyledLabelListItem = styled("div")<TitleProps>`
  margin-bottom: 20px;

  .lms-icon-title {
    margin-bottom: 5px;
  }
`;

export const LabelListItem: React.FC<TitleProps> = (props) => {
  const {
    children,
    variant = "header",
    title,
    icon,
    mobile = false,
    titleTag,
  } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledLabelListItem className="wellms-component">
      {variant === "header" ? (
        <React.Fragment>
          {title && (
            <IconTitle
              level={mobile ? 5 : 4}
              title={title}
              icon={icon}
              as={titleTag ?? "h1"}
            />
          )}
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
              color: theme?.labelListValueColor ?? theme.primaryColor,
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
