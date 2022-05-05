import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";

import { Title } from "../Typography/Title";
import { Text } from "../Typography/Text";

export type TagProps = React.HTMLProps<HTMLDivElement>

const StyledTag = styled("div")`
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const Tag: React.FC<TagProps> = (props) => {
  const { children, title } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledTag>
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
        as={"h5"}
      >
        {children}
      </Title>
    </StyledTag>
  );
};

const NewTags = styled(Tag)<TagProps>``;

export default withTheme(NewTags);
