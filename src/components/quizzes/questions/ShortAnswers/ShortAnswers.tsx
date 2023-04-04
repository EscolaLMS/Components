import React from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";
import { Input } from "../../../..";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props extends API.QuizQuestion_ShortAnswers {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const ShortAnswers: React.FC<Props> = ({
  question,
  title,
  id,
  onChange,
  onBlur,
  value,
  hasQuizEnded,
  resultScore,
}) => {
  const { t } = useTranslation();

  return (
    <DefaultQuestionLayout
      data-testid={`short-answers-${question}`}
      title={title}
      question={question}
      resultScore={resultScore}
      showScore={hasQuizEnded}
    >
      <Input
        placeholder={t<string>("GiftQuizPlayer.TypeAnswer", {
          defaultValue: "Type your answer",
        })}
        id={`${id}`}
        name={`${id}`}
        disabled={hasQuizEnded}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultQuestionLayout>
  );
};

export default withTheme(styled(ShortAnswers)<{ mobile: boolean }>``);
