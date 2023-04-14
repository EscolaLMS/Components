import React, { useContext, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { TreeSelect, TreeSelectProps } from "../../atoms/TreeSelect";
import { Stack } from "../../../";
import { getFontFromTheme } from "../../../theme/provider";
import { getStylesBasedOnTheme } from "../../../utils/utils";

type Props<ValueType> = Omit<TreeSelectProps<ValueType>, "treeData"> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
};

interface TreeNode {
  title: string;
  label: string;
  value: RelatedValue; // `${class}:${id}`
  children?: TreeNode[];
}

// `${class}:${id}`
export type RelatedValue =
  | `EscolaLMS\\Courses\\Course:${number}`
  | `EscolaLMS\\Courses\\Topic:${number}`
  | `EscolaLMS\\Courses\\Lesson:${number}`;

function isLesson(el: API.Lesson | API.Topic): el is API.Lesson {
  return (el as API.Lesson).lessons !== undefined;
}

const traverseTree = (
  branch: API.Lesson[] | API.Topic[],
  currLabel: string
): TreeNode[] => {
  return branch?.map((br) => {
    if (isLesson(br)) {
      const label = `${currLabel} - ${br.title}`;
      return {
        title: br.title,
        label,
        value: `EscolaLMS\\Courses\\Lesson:${br.id}`,
        children: [
          ...traverseTree(br.lessons as API.Lesson[], label),
          ...traverseTree(br?.topics ?? [], label),
        ],
      };
    }

    return {
      title: br.title,
      label: `${currLabel} - ${br.title}`,
      value: `EscolaLMS\\Courses\\Topic:${br.id}`,
    };
  });
};

const textPartial = css`
  font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
  font-size: 14px;
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
`;

const Label = styled.label`
  ${textPartial}
`;

const Error = styled.div`
  ${textPartial};
  color: ${({ theme }) => theme.errorColor};
  margin-bottom: 1em;
`;

export const RelatedTreeSelect = <ValueType,>({
  treeDefaultExpandAll = true,
  id,
  label,
  error,
  ...props
}: Props<ValueType>) => {
  const { progress, fetchProgress, fetchProgram, program } =
    useContext(EscolaLMSContext);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  useEffect(() => {
    if (progress.value) {
      progress.value.forEach((progItem) => fetchProgram(progItem.course.id));
    }
  }, [progress, fetchProgram]);

  const treeData: TreeNode[] = useMemo(() => {
    if (!program || !program.byId) return [];

    return Object.values(program.byId).reduce<TreeNode[]>(
      (acc, courseProgram) => {
        if (!courseProgram.value) return acc;

        return [
          ...acc,
          {
            title: courseProgram.value.title,
            label: courseProgram.value.title,
            value: `EscolaLMS\\Courses\\Course:${courseProgram.value.id}`,
            children: traverseTree(
              courseProgram.value?.lessons ?? [],
              courseProgram.value.title
            ),
          },
        ];
      },
      []
    );
  }, [program]);

  return (
    <Stack $gap={4}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TreeSelect
        {...props}
        id={id}
        treeDefaultExpandAll={treeDefaultExpandAll}
        treeData={treeData}
      />
      {error && <Error data-testid={`Error.${id}`}>{error}</Error>}
    </Stack>
  );
};
