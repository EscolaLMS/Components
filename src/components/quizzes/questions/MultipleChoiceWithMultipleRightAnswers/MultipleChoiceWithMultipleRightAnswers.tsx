import React from "react";
import { API } from "@escolalms/sdk/lib";
import { Checkbox } from "../../../../";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props
  extends API.QuizQuestion_MultipleChoiceWithMultipleRightAnswers {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  values: Record<string, boolean>;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const MultipleChoiceWithMultipleRightAnswers: React.FC<Props> = ({
  id,
  question,
  title,
  options,
  onChange,
  onBlur,
  values,
  hasQuizEnded,
  resultScore,
}) => {
  const getChecked = (option: string) =>
    Object.entries(values).find(([key]) => key === option)?.[1];

  return (
    <DefaultQuestionLayout
      data-testid={`multiple-choice-multiple-right-${question}`}
      title={title}
      question={question}
      resultScore={resultScore}
      showScore={hasQuizEnded}
    >
      {options?.answers.map((option) => (
        <Checkbox
          label={option}
          disabled={hasQuizEnded}
          key={option}
          id={option}
          value={option}
          name={`${id}.${option}`}
          checked={getChecked(option)}
          onChange={onChange}
          onBlur={onBlur}
        />
      ))}
    </DefaultQuestionLayout>
  );
};

export default withTheme(styled(MultipleChoiceWithMultipleRightAnswers)``);
