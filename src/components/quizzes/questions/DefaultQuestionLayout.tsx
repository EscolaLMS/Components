import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { withTheme } from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { Text, Title, Stack } from "../../..";

type ResultScore = null | number;

type ResultScoreState = "positive" | "neutral" | "negative";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  question: string;
  children: React.ReactNode;
  showScore?: boolean;
  resultScore?: ResultScore;
}

const RelativeText = styled(Text)`
  position: relative;
  width: max-content;
`;

// const scoreBackgrounds: Record<ResultScoreState, Color> = {
//   positive: "systemPositive500",
//   neutral: "systemWarning500",
//   negative: "systemDanger500",
// };

const ScoreIndicator = styled.span<{ $scoreState: ResultScoreState }>`
  position: absolute;
  top: -8px;
  right: -12px;
  padding-inline: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__colorBackground,
      theme.colorBackground,
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )
    )};

  line-height: 1.3;

  // fade animation
  &.fade-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: scale(1);
  }
  &.fade-enter-done {
    opacity: 1;
    transform: scale(1);
  }
  &.fade-exit-active {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const LeftPaddingStack = styled(Stack)``;

function determineResultScoreState(score?: ResultScore): ResultScoreState {
  if (!score) return "neutral";
  else if (score > 0) return "positive";
  else if (score < 0) return "negative";

  return "neutral";
}

const resultScoreSign: Record<ResultScoreState, string> = {
  positive: "+",
  neutral: "",
  negative: "-",
};

const DefaultQuestionLayout: React.FC<Props> = ({
  title,
  question,
  children,
  showScore,
  resultScore,
  ...props
}) => {
  const resultScoreState = determineResultScoreState(resultScore);
  const scoreRef = useRef<HTMLSpanElement | null>(null);

  return (
    <Stack {...props} $gap={6}>
      <Stack $gap={2}>
        {title && <Title as={"h3"}>{title}</Title>}
        <RelativeText>
          {question}
          <CSSTransition
            in={showScore}
            nodeRef={scoreRef}
            timeout={200}
            classNames="fade"
            unmountOnExit
          >
            <ScoreIndicator ref={scoreRef} $scoreState={resultScoreState}>
              {`${resultScoreSign[resultScoreState]}${resultScore ?? 0}`}
            </ScoreIndicator>
          </CSSTransition>
        </RelativeText>
      </Stack>
      <LeftPaddingStack $gap={4}>{children}</LeftPaddingStack>
    </Stack>
  );
};

export default withTheme(styled(DefaultQuestionLayout)<{ mobile: boolean }>``);
