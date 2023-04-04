export type GiftQuizTextAnswer = { text: string };

export type GiftQuizMultipleAnswer = {
  multiple: string[];
};
export type GiftQuizMatchingAnswer = { matching: Record<string, string> };
export type GiftQuizNumericAnswer = { numeric: number };
export type GiftQuizBooleanAnswer = { bool: boolean };

export type GiftQuizAnswer =
  | GiftQuizTextAnswer
  | GiftQuizMultipleAnswer
  | GiftQuizMatchingAnswer
  | GiftQuizNumericAnswer
  | GiftQuizBooleanAnswer;

interface GiftQuizAnswerObjBase {
  id: number;
  topic_gift_question_id: number;
  score: number | null;
  feedback: string | null;
}

export type GiftQuizTextAnswerObj = GiftQuizAnswerObjBase & {
  answer: GiftQuizTextAnswer;
};

export type GiftQuizMultipleAnswerObj = GiftQuizAnswerObjBase & {
  answer: GiftQuizMultipleAnswer;
};

export type GiftQuizMatchingAnswerObj = GiftQuizAnswerObjBase & {
  answer: GiftQuizMatchingAnswer;
};

export type GiftQuizNumericAnswerObj = GiftQuizAnswerObjBase & {
  answer: GiftQuizNumericAnswer;
};

export type GiftQuizBooleanAnswerObj = GiftQuizAnswerObjBase & {
  answer: GiftQuizBooleanAnswer;
};

export type GiftQuizAnswerObj =
  | GiftQuizTextAnswerObj
  | GiftQuizMultipleAnswerObj
  | GiftQuizMatchingAnswerObj
  | GiftQuizNumericAnswerObj
  | GiftQuizBooleanAnswerObj;
