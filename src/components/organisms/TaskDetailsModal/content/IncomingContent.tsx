import React, { ChangeEvent, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { isAfter, isBefore, isToday, isTomorrow } from "date-fns";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { Checkbox, Row, Stack, Text, TextArea, Title } from "../../../../";
import { RelatedTreeSelect } from "../../../molecules/RelatedTreeSelect";
import { HiOutlineDocumentText, HiOutlineCalendar } from "react-icons/hi";

import {
  LeftCol,
  LeftPaddingWrapper,
  RightCol,
  SectionHeader,
  Note,
  NotesContainer,
} from "./common";

interface Props {
  task: API.Task & { has_notes: boolean };
  onTaskStatusUpdateSuccess?: () => void;
}

const StyledRow = styled(Row)`
  height: calc(100% - 50px);
`;

const DueDate = styled.div<{ $isOverdue: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.dm__outlineButtonColor};
  padding: 8px 12px;
  color: ${({ theme, $isOverdue }) =>
    $isOverdue ? theme.errorColor : theme.dm__primaryColor};
`;

const StyledTitle = styled(Title)<{ $isCompleted: boolean }>`
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? "line-through" : "none"};
`;

const checkDate = (date: string) => {
  if (isToday(new Date(date))) return "Today";
  if (isTomorrow(new Date(date))) return "Tomorrow";
  if (isBefore(new Date(date), new Date())) return "Overdue";
  if (isAfter(new Date(date), new Date())) return "Upcoming";
};

export const IncomingContent: React.FC<Props> = ({
  task,
  onTaskStatusUpdateSuccess,
}) => {
  const { updateTaskStatus } = useContext(EscolaLMSContext);
  const { t } = useTranslation();
  const date = checkDate(task.due_date);

  return (
    <StyledRow>
      <LeftCol>
        <SectionHeader>
          <Row $gap={16}>
            <Checkbox
              checked={!!task.completed_at}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateTaskStatus(task.id, e.target.checked).then(() => {
                  onTaskStatusUpdateSuccess?.();
                })
              }
            />
            <StyledTitle $isCompleted={!!task.completed_at}>
              {task.title}
            </StyledTitle>
          </Row>
          <LeftPaddingWrapper>
            <RelatedTreeSelect
              label={t<string>("Tasks.RelatesTo")}
              disabled
              value={`${task.related_type}:${task.related_id}`}
            />
            <TextArea
              name="description"
              defaultValue={
                task.description ?? t<string>("Tasks.ThereIsNoDescription")
              }
              disabled
            />
            <NotesContainer>
              <Row $alignItems="center" $gap={4}>
                <HiOutlineDocumentText />
                <Text>{t<string>("Tasks.Notes")}</Text>
              </Row>
              <Stack $gap={8}>
                {task.has_notes && task.notes ? (
                  task.notes.map(({ note }: { note: string }) => (
                    <Note key={note}>{note}</Note>
                  ))
                ) : (
                  <Text>{t<string>("Tasks.NoNotes")}</Text>
                )}
              </Stack>
            </NotesContainer>
          </LeftPaddingWrapper>
        </SectionHeader>
      </LeftCol>
      <RightCol>
        <Text noMargin>{t("TaskDetails.Due", { defaultValue: "Due" })}</Text>
        <DueDate $isOverdue={date === "Overdue"}>
          <HiOutlineCalendar />
          {date}
        </DueDate>
      </RightCol>
    </StyledRow>
  );
};
