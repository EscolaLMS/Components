/* eslint-disable no-case-declarations */
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import { Formik } from "formik";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { getQuizAttempts } from "@escolalms/sdk/lib/services/gfit_quiz";

import {
  GiftQuizBooleanAnswer,
  GiftQuizAnswer,
  GiftQuizAnswerObj,
  GiftQuizMultipleAnswer,
  GiftQuizNumericAnswer,
  GiftQuizTextAnswer,
  GiftQuizMatchingAnswer,
} from "types/gift-quiz";

import { Button, Countdown, Row, Stack, Title } from "../../";
import MultipleChoice from "./questions/MultipleChoice/MultipleChoice";
import MultipleChoiceWithMultipleRightAnswers from "./questions/MultipleChoiceWithMultipleRightAnswers/MultipleChoiceWithMultipleRightAnswers";
import TrueFalse from "./questions/TrueFalse/TrueFalse";
import ShortAnswers from "./questions/ShortAnswers/ShortAnswers";
import Matching from "./questions/Matching/Matching";
import NumericalQuestion from "./questions/NumericalQuestion/NumericalQuestion";
import Essay from "./questions/Essay/Essay";
import Description from "./questions/Description/Description";
import GiftQuizScore from "./GiftQuizScore";

interface Props {
  attempt: API.QuizAttempt & {
    is_ended?: boolean;
  };
  startQuiz: () => void;
  endQuiz: (quizAttemptId: number) => void;
  sendAnswer: <Answer extends GiftQuizAnswer>(
    questionId: number,
    answer: Answer
  ) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AttemptsTooltipWrapper = styled(Row)`
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primaryColor};
`;

const AttemptsTooltipCloseButton = styled(Button)`
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

function isTextAnswer(
  answer?: GiftQuizAnswer | string
): answer is GiftQuizTextAnswer {
  return typeof (answer as GiftQuizTextAnswer)?.text === "string";
}

function isMultipleAnswer(
  answer?: GiftQuizAnswer | string
): answer is GiftQuizMultipleAnswer {
  return Array.isArray((answer as GiftQuizMultipleAnswer)?.multiple);
}

function isNumericAnswer(
  answer?: GiftQuizAnswer | string
): answer is GiftQuizNumericAnswer {
  return typeof (answer as GiftQuizNumericAnswer)?.numeric === "number";
}

function isBooleanAnswer(
  answer?: GiftQuizAnswer | string
): answer is GiftQuizBooleanAnswer {
  return typeof (answer as GiftQuizBooleanAnswer)?.bool === "boolean";
}

function isMatchingAnswer(
  answer?: GiftQuizAnswer | string
): answer is GiftQuizMatchingAnswer {
  return typeof (answer as GiftQuizMatchingAnswer)?.matching === "object";
}

const getDefaultValues = (
  questions: API.QuizQuestion[],
  answers?: EscolaLms.TopicTypeGift.Models.AttemptAnswer[] | null
) => {
  const findAnswer = (questionId: number) =>
    answers?.find((ansObj) => ansObj.topic_gift_question_id === questionId)
      ?.answer;

  return questions.reduce<
    Record<string, string | Record<string, boolean> | Record<string, string>>
  >((acc, { id, type, options }) => {
    const answer = findAnswer(id);

    switch (type) {
      case API.QuestionType.ESSAY:
      case API.QuestionType.SHORT_ANSWERS:
      case API.QuestionType.MULTIPLE_CHOICE:
        const textVal = isTextAnswer(answer) ? answer.text : "";

        return {
          ...acc,
          [`${id}`]: textVal,
        };
      case API.QuestionType.MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS:
        const multipleVal = isMultipleAnswer(answer) ? answer.multiple : [];

        return {
          ...acc,
          [`${id}`]: options.answers.reduce(
            (acc, question) => ({
              ...acc,
              [question]: multipleVal.includes(question),
            }),
            {}
          ),
        };
      case API.QuestionType.NUMERICAL_QUESTION:
        const numericVal = isNumericAnswer(answer) ? `${answer.numeric}` : "";
        return {
          ...acc,
          [`${id}`]: numericVal,
        };
      case API.QuestionType.TRUE_FALSE:
        const booleanVal = isBooleanAnswer(answer)
          ? answer.bool
            ? "true"
            : "false"
          : "";
        return {
          ...acc,
          [`${id}`]: booleanVal,
        };
      case API.QuestionType.MATCHING:
        const matchingVal = isMatchingAnswer(answer) ? answer.matching : {};
        return { ...acc, [`${id}`]: matchingVal };
      default:
        return acc;
    }
  }, {});
};

function useAttemptsTooltip(quizId: number | undefined) {
  const { token, apiUrl } = useContext(EscolaLMSContext);
  const [attempts, setAttempts] = useState({
    loading: false,
    count: 0,
    tooltipOpen: false,
  });

  const refreshAttemptsCount = useCallback(() => {
    if (token && quizId) {
      getQuizAttempts(apiUrl, token, { topic_gift_quiz_id: quizId })
        .then((res) => {
          if (res.success) {
            setAttempts((prev) => ({
              ...prev,
              count: res.meta.total,
              tooltipOpen: true,
            }));
          }
        })
        .finally(() => {
          setAttempts((prev) => ({ ...prev, loading: false }));
        });
    }
  }, [apiUrl, quizId, token]);

  return useMemo(
    () => ({
      attempts,
      refreshAttemptsCount,
      closeTooltip: () =>
        setAttempts((prev) => ({ ...prev, tooltipOpen: false })),
    }),
    [attempts, refreshAttemptsCount]
  );
}

export const GiftQuizPlayerContent: React.FC<Props> = ({
  attempt,
  startQuiz,
  endQuiz,
  sendAnswer,
}) => {
  const { t } = useTranslation();
  const { attempts, refreshAttemptsCount, closeTooltip } = useAttemptsTooltip(
    attempt.topic_gift_quiz_id
  );
  const defaultValues = useMemo(
    () => getDefaultValues(attempt.questions, attempt.answers),
    [attempt.questions, attempt.answers]
  );

  const getQuizResultScore = useCallback(
    (questionId: number): number | undefined | null =>
      (attempt.answers as unknown as GiftQuizAnswerObj[]).find(
        ({ topic_gift_question_id }) => topic_gift_question_id === questionId
      )?.score,
    [attempt.answers]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      onSubmit={() => {
        endQuiz(attempt.id);
        refreshAttemptsCount();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        handleBlur,
        resetForm,
        setFieldValue,
      }) => (
        <Form
          onSubmit={handleSubmit}
          data-testid="gift-quiz-player-content"
          className="quiz__questions-form"
        >
          <Stack $gap={8}>
            <Row $justifyContent="space-between">
              <Title className="quiz__title">
                {t<string>("Quiz.Questions")}
              </Title>
              <Row $gap={24} $alignItems="center">
                {attempt?.is_ended ? (
                  <>
                    <GiftQuizScore
                      result={attempt?.result_score}
                      max={attempt?.max_score}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        startQuiz();
                        resetForm();
                      }}
                    >
                      {t<string>("Quiz.Retry")}
                    </Button>
                  </>
                ) : (
                  <>
                    {attempt?.end_at && (
                      <Countdown
                        targetDate={String(attempt?.end_at)}
                        onCountdownEnd={() => endQuiz(attempt?.id)}
                      />
                    )}
                    <Button type="submit" mode="primary">
                      {t<string>("Quiz.Submit")}
                    </Button>
                  </>
                )}
              </Row>
            </Row>
            {attempts.tooltipOpen && (
              <AttemptsTooltipWrapper
                $alignItems="center"
                $justifyContent="space-between"
              >
                {t<string>("Quiz.YouHaveMade")}
                {` ${attempts.count} `}
                {t<string>("Quiz.Attempts")}
                <AttemptsTooltipCloseButton onClick={closeTooltip} />
              </AttemptsTooltipWrapper>
            )}
          </Stack>
          {attempt.questions.map((question: API.QuizQuestion) => {
            switch (question.type) {
              case API.QuestionType.MULTIPLE_CHOICE:
                return (
                  <MultipleChoice
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      sendAnswer(question.id, {
                        text: e.target.value,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[`${question.id}`] as string}
                    hasQuizEnded={attempt?.is_ended}
                    resultScore={getQuizResultScore(question.id)}
                  />
                );
              case API.QuestionType.MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS:
                return (
                  <MultipleChoiceWithMultipleRightAnswers
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const currOption = e.target.value;
                      const currVal = e.target.checked;

                      const answer = Object.entries(
                        values[`${question.id}`]
                      ).reduce<string[]>((acc, [key, bool]) => {
                        if (key === currOption) {
                          return currVal ? [...acc, currOption] : acc;
                        }

                        return bool ? [...acc, key] : acc;
                      }, []);

                      sendAnswer(question.id, {
                        multiple: answer,
                      });
                    }}
                    onBlur={handleBlur}
                    values={values[`${question.id}`] as Record<string, boolean>}
                    hasQuizEnded={attempt?.is_ended}
                    resultScore={getQuizResultScore(question.id)}
                  />
                );
              case API.QuestionType.TRUE_FALSE:
                return (
                  <TrueFalse
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      sendAnswer(question.id, {
                        bool: e.target.value === "true",
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[`${question.id}`] as string}
                    hasQuizEnded={attempt?.is_ended}
                    resultScore={getQuizResultScore(question.id)}
                  />
                );
              case API.QuestionType.SHORT_ANSWERS:
                return (
                  <ShortAnswers
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      sendAnswer(question.id, {
                        text: e.target.value,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[`${question.id}`] as string}
                    resultScore={getQuizResultScore(question.id)}
                    hasQuizEnded={attempt?.is_ended}
                  />
                );
              case API.QuestionType.MATCHING:
                return (
                  <Matching
                    {...question}
                    key={question.type + question.id}
                    onChange={(values: GiftQuizMatchingAnswer) => {
                      setFieldValue(`${question.id}`, values);
                      sendAnswer(question.id, values);
                    }}
                    values={values[`${question.id}`] as Record<string, string>}
                    resultScore={getQuizResultScore(question.id)}
                    hasQuizEnded={attempt?.is_ended}
                  />
                );
              case API.QuestionType.NUMERICAL_QUESTION:
                return (
                  <NumericalQuestion
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      sendAnswer(question.id, {
                        numeric: +e.target.value,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[`${question.id}`] as string}
                    resultScore={getQuizResultScore(question.id)}
                    hasQuizEnded={attempt?.is_ended}
                  />
                );
              case API.QuestionType.ESSAY:
                return (
                  <Essay
                    {...question}
                    key={question.type + question.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      sendAnswer(question.id, {
                        text: e.target.value,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[`${question.id}`] as string}
                    resultScore={getQuizResultScore(question.id)}
                    hasQuizEnded={attempt?.is_ended}
                  />
                );
              case API.QuestionType.DESCRIPTION:
                return (
                  <Description
                    {...question}
                    key={question.type + question.id}
                  />
                );
              default:
                return <React.Fragment />;
            }
          })}
        </Form>
      )}
    </Formik>
  );
};

export default withTheme(styled(GiftQuizPlayerContent)``);
