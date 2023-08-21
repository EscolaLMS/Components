import { API } from "@escolalms/sdk/lib";

export function getFlatTopics(lessons: API.Lesson[]): API.Topic[] {
  return lessons.reduce<API.Topic[]>(
    (acc, l) => [
      ...acc,
      ...getFlatTopics(l?.lessons ?? []),
      ...(l?.topics ?? []),
    ],
    []
  );
}

export function getFlatLessons(lessons: API.Lesson[]): API.Lesson[] {
  return lessons.reduce<API.Lesson[]>(
    (acc, l) => [...acc, ...getFlatLessons(l?.lessons ?? []), l],
    []
  );
}

export const getLessonParentsIds = (
  flatLessons: API.Lesson[],
  lesson: API.Lesson,
  result: number[] = []
): number[] => {
  const parentsIds: number[] = [...result];

  const parentLesson = flatLessons.find((l) =>
    l?.lessons?.find((innerL: API.Lesson) => innerL?.id === lesson?.id)
  );

  if (parentLesson) {
    parentsIds.unshift(parentLesson.id);
    return getLessonParentsIds(flatLessons, parentLesson, parentsIds);
  }

  return parentsIds;
};
