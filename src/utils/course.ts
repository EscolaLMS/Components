import { API } from "@escolalms/sdk/lib";

export function getFlatTopics(lessons: API.Lesson[]): API.Topic[] {
  return lessons.reduce<API.Topic[]>(
    (acc, l) => [
      ...acc,
      ...(l?.topics ?? []),
      ...getFlatTopics(l?.lessons ?? []),
    ],
    []
  );
}

export function getFlatLessons(lessons: API.Lesson[]): API.Lesson[] {
  return lessons.reduce<API.Lesson[]>(
    (acc, l) => [...acc, l, ...getFlatLessons(l?.lessons ?? [])],
    []
  );
}

export function getLessonParentsIds(
  flatLessons: API.Lesson[],
  lesson: API.Lesson,
  result: number[] = []
): number[] {
  const parentsIds: number[] = [...result];

  const parentLesson = flatLessons.find((l) =>
    l?.lessons?.find((innerL: API.Lesson) => innerL?.id === lesson?.id)
  );

  if (parentLesson) {
    parentsIds.unshift(parentLesson.id);
    return getLessonParentsIds(flatLessons, parentLesson, parentsIds);
  }

  return parentsIds;
}
