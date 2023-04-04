import React from "react";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0f20c2c872015d548085970229349aee57460447
import { API } from "@escolalms/sdk/lib";
import { Radio } from "../../../..";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import styled, { withTheme } from "styled-components";

interface Props extends API.QuizQuestion_TrueFalse {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string;
  hasQuizEnded?: boolean;
  resultScore?: number | null;
}

const inputs = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const TrueFalse: React.FC<Props> = ({
  question,
  id,
  title,
  onChange,
  onBlur,
  value,
  hasQuizEnded,
  resultScore,
}) => (
  <DefaultQuestionLayout
    data-testid={`true-false-${question}`}
    title={title}
    question={question}
    resultScore={resultScore}
    showScore={hasQuizEnded}
  >
    {inputs.map((input) => (
      <Radio
        label={input.label}
        key={input.value}
        disabled={hasQuizEnded}
        id={`${input.label}`}
        value={input.value}
        name={`${id}`}
        checked={value === input.value}
        onChange={onChange}
        onBlur={onBlur}
      />
    ))}
  </DefaultQuestionLayout>
);

export default withTheme(styled(TrueFalse)``);
