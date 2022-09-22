import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { PropsWithChildren } from "react";
import { ExtendableStyledComponent } from "types/component";

export interface DescriptionProps
  extends React.HTMLProps<HTMLDivElement>,
    ExtendableStyledComponent {}

const StyledDescription = styled("div")`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Description: React.FC<PropsWithChildren<DescriptionProps>> = (
  props
) => {
  const { children, title, className = "" } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledDescription className={`wellms-component ${className}`}>
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
        level={5}
        style={{
          marginBottom: 0,
          color: theme.primaryColor,
        }}
        as={"h1"}
      >
        {children}
      </Title>
    </StyledDescription>
  );
};

const NewDescription = styled(Description)<DescriptionProps>``;

export default withTheme(NewDescription);
