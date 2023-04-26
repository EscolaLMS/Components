import React from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";
import { Input } from "../../../../";
import { getUniqueId } from "../../../../utils/utils";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props extends API.QuizQuestion_NumericalQuestion {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const NumericalQuestion: React.FC<Props> = ({
  id,
  question,
  title,
  onBlur,
  onChange,
  value,
  hasQuizEnded,
  resultScore,
}) => {
  const { t } = useTranslation();

  return (
    <DefaultQuestionLayout
      data-testid={`numerical-question-${question}`}
      title={title}
      question={question}
      resultScore={resultScore}
      showScore={hasQuizEnded}
    >
      <Input
        placeholder={t<string>("Quiz.TypeNumber")}
        type="number"
        name={`${id}`}
        id={getUniqueId(`Numerical-${id}`)}
        disabled={hasQuizEnded}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultQuestionLayout>
  );
};

export default withTheme(styled(NumericalQuestion)``);
