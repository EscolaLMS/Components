import React from "react";
import { API } from "@escolalms/sdk/lib";
import { Stack, Text } from "../../../../";
import styled, { withTheme } from "styled-components";

type Props = API.QuizQuestion_Description;

const Description: React.FC<Props> = ({ title, question }) => (
  <Stack data-testid={`description-${question}`} $gap={2}>
    {title && (
      <Text weight="bold" size="lg">
        {title}
      </Text>
    )}
    <Text family="secondary" weight="semiBold">
      {question}
    </Text>
  </Stack>
);

export default withTheme(styled(Description)<{ mobile: boolean }>``);
