import React from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";
import { TextArea } from "../../../../";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props extends API.QuizQuestion_Essay {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  value: string;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const Essay: React.FC<Props> = ({
  id,
  title,
  question,
  onChange,
  onBlur,
  value,
  hasQuizEnded,
  resultScore,
}) => {
  const { t } = useTranslation();
  return (
    <DefaultQuestionLayout
      data-testid={`essay-${question}`}
      title={title}
      question={question}
      resultScore={resultScore}
      showScore={hasQuizEnded}
    >
      <TextArea
        placeholder={t<string>("Quiz.TypeAnswer")}
        name={`${id}`}
        disabled={hasQuizEnded}
        id={`${id}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultQuestionLayout>
  );
};

export default withTheme(styled(Essay)``);
