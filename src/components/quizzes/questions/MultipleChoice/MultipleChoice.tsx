import React from "react";
import { API } from "@escolalms/sdk/lib";

import { Radio } from "../../../../";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props extends API.QuizQuestion_MultipleChoice {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const MultipleChoice: React.FC<Props> = ({
  question,
  id,
  options,
  title,
  onChange,
  onBlur,
  value,
  hasQuizEnded,
  resultScore,
}) => (
  <DefaultQuestionLayout
    data-testid={`multiple-choice-${question}`}
    title={title}
    question={question}
    resultScore={resultScore}
    showScore={hasQuizEnded}
  >
    {options?.answers.map((option) => (
      <Radio
        label={option}
        key={option}
        id={option}
        value={option}
        disabled={hasQuizEnded}
        name={`${id}`}
        checked={value === option}
        onChange={onChange}
        onBlur={onBlur}
      />
    ))}
  </DefaultQuestionLayout>
);

export default withTheme(styled(MultipleChoice)``);
