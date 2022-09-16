import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { PropsWithChildren } from "react";

export type DescriptionProps = React.HTMLProps<HTMLDivElement>;

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
  const { children, title } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledDescription className="wellms-component">
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
          color:
            theme.mode === "dark" && theme.primaryColorDark
              ? theme.primaryColorDark
              : theme.primaryColor,
        }}
        as={"h5"}
      >
        {children}
      </Title>
    </StyledDescription>
  );
};

const NewDescription = styled(Description)<DescriptionProps>``;

export default withTheme(NewDescription);
