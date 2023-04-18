import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import { API } from "@escolalms/sdk/lib/index";
import {
  quizAttempt as fetchQuizAttempt,
  quizAnswer,
  quizAttemptFinish,
} from "@escolalms/sdk/lib/services/gfit_quiz";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { GiftQuizAnswer } from "types/gift-quiz";
import { Button, Spin } from "../../";
import GiftQuizPlayerContent from "./GiftQuizPlayerContent";

interface Props {
  topic: API.TopicQuiz;
  onTopicEnd?: () => void;
  className?: string;
}

interface QuizData {
  loading: boolean;
  value?: API.QuizAttempt & {
    is_ended?: boolean;
  };
  error?: API.DefaultResponseError;
}

const Wrapper = styled.div`
  & > .spinner__overlay {
    min-height: 529px;
  }
`;

const StartButtonWrapper = styled.div`
  width: 100%;
  min-height: 529px;
  display: grid;
  place-items: center;
`;

function useQuiz(quizId: number | undefined, onTopicEnd?: () => void) {
  const [data, setData] = useState<QuizData>({ loading: false });
  const { token, apiUrl } = useContext(EscolaLMSContext);

  const topicEndCb = useRef(onTopicEnd);

  const startQuiz = useCallback(() => {
    if (quizId && token) {
      setData((prev) => ({ ...prev, loading: true }));
      fetchQuizAttempt(apiUrl, token, {
        topic_gift_quiz_id: quizId,
      })
        .then((response) => {
          if (response.success) {
            setData((prev) => ({ ...prev, value: response.data }));
          } else {
            setData((prev) => ({ ...prev, error: response }));
          }
        })
        .catch((error: API.DefaultResponseError) => {
          setData((prev) => ({ ...prev, error }));
        })
        .finally(() => {
          setData((prev) => ({ ...prev, loading: false }));
        });
    }
  }, [quizId, apiUrl, token]);

  const endQuiz = useCallback(
    (quizAttemptId: number) => {
      if (token) {
        quizAttemptFinish(apiUrl, token, quizAttemptId).then((response) => {
          if (response.success) {
            setData((prev) => ({ ...prev, value: response.data }));
            topicEndCb.current?.();
          }
        });
      }
    },
    [token, apiUrl]
  );

  const sendAnswer = useCallback(
    <Answer extends GiftQuizAnswer>(questionId: number, answer: Answer) => {
      if (data?.value?.id && token && !data?.value?.is_ended) {
        quizAnswer(apiUrl, token, {
          topic_gift_question_id: questionId,
          topic_gift_quiz_attempt_id: data.value.id,
          answer,
        });
      }
    },
    [token, apiUrl, data?.value?.id, data?.value?.is_ended]
  );

  const getQuestionAnswerObj = useCallback(
    (questionId: number) =>
      data.value?.answers?.find(
        (answerItem) => answerItem?.topic_gift_question_id === questionId
      ),
    [data.value?.answers]
  );

  return useMemo(
    () => ({
      data,
      startQuiz,
      sendAnswer,
      getQuestionAnswerObj,
      endQuiz,
    }),
    [data, sendAnswer, getQuestionAnswerObj, startQuiz, endQuiz]
  );
}

const GiftQuizPlayer: React.FC<Props> = ({ topic, className, onTopicEnd }) => {
  const { t } = useTranslation();
  const { data, startQuiz, sendAnswer, endQuiz } = useQuiz(
    topic.topicable.id,
    onTopicEnd
  );

  return (
    <Wrapper data-testid="gift-quiz-player" className={className}>
      {!data.value && !data.loading && (
        <StartButtonWrapper>
          <Button mode="secondary" type="button" onClick={startQuiz}>
            {t<string>("Quiz.Start")}
          </Button>
        </StartButtonWrapper>
      )}
      {data.loading && !data.value && <Spin />}
      {data.value && (
        <GiftQuizPlayerContent
          attempt={data.value}
          startQuiz={startQuiz}
          sendAnswer={sendAnswer}
          endQuiz={endQuiz}
        />
      )}
    </Wrapper>
  );
};

export default withTheme(styled(GiftQuizPlayer)``);
