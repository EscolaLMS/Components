import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import { Row, Text } from "../../";

export type QuizScoreColor = "systemDanger" | "systemPositive";

interface Props {
  result?: number;
  max?: number;
}

const Wrapper = styled(Row)`
  padding: 12px;
  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.primaryColor};
`;

const Progress = styled.span<{
  $percentage: number;
}>`
  position: relative;
  display: block;
  width: 52px;
  height: 12px;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 4px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $percentage }) => $percentage * 52}px;
    height: 12px;
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

const GiftQuizScore: React.FC<Props> = ({ result, max }) => {
  const { t } = useTranslation();
  const percentage = useMemo(() => {
    const percentageRes = (result ?? 0) / (max ?? 0);
    return Number.isNaN(percentageRes) ? 0 : percentageRes;
  }, [max, result]);

  return (
    <Wrapper data-testid="gift-quiz-score" $gap={12} $alignItems="center">
      <Row $gap={6} $alignItems="center">
        <Text family="secondary" size="xs" weight="bold">
          {t<string>("Quiz.YourScore")}
        </Text>
      </Row>
      <Row $gap={8} $alignItems="center">
        <Progress $percentage={percentage} />
        <Text family="secondary" size="xs" weight="bold">
          {result}/{max}
        </Text>
      </Row>
    </Wrapper>
  );
};

export default withTheme(styled(GiftQuizScore)``);
