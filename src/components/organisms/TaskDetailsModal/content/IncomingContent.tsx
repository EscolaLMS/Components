import React, { ChangeEvent, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { format } from "date-fns";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import {
  Checkbox,
  Input,
  Row,
  Stack,
  Text,
  TextArea,
  Title,
} from "../../../../";
import { RelatedTreeSelect } from "../../../molecules/RelatedTreeSelect";
import { HiOutlineDocumentText, HiOutlineCalendar } from "react-icons/hi";

import {
  LeftCol,
  RightCol,
  SectionHeader,
  Note,
  NotesContainer,
} from "./common";
import { ProgrammeText } from "../../../../components/organisms/TasksComponent/styles";

interface Props {
  taskForAction: API.Task & { has_notes: boolean };
  onTaskStatusUpdateSuccess?: () => void;
}

const StyledRow = styled(Row)`
  height: calc(100% - 50px);
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.dm__outlineButtonColor};
  padding: 8px 12px;
  color: ${({ theme }) => theme.dm__primaryColor};
`;

const StyledTitle = styled(Title)<{ $isCompleted: boolean }>`
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? "line-through" : "none"};
`;

export const IncomingContent: React.FC<Props> = ({
  taskForAction,
  onTaskStatusUpdateSuccess,
}) => {
  const { updateTaskStatus, fetchTask, task } = useContext(EscolaLMSContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchTask(taskForAction.id);
  }, [fetchTask, taskForAction.id]);
  return (
    <StyledRow>
      <LeftCol>
        <SectionHeader>
          <Row $gap={16}>
            <Checkbox
              disabled
              checked={!!taskForAction.completed_at}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateTaskStatus(taskForAction.id, e.target.checked).then(
                  () => {
                    onTaskStatusUpdateSuccess?.();
                  }
                )
              }
            />
            <StyledTitle $isCompleted={!!taskForAction.completed_at}>
              {taskForAction.title}
            </StyledTitle>
          </Row>
          {taskForAction.related_id && taskForAction.related_type && (
            <ProgrammeText>
              <RelatedTreeSelect
                disabled
                value={`${taskForAction.related_type}:${taskForAction.related_id}`}
              />
            </ProgrammeText>
          )}
          {taskForAction.description && (
            <TextArea
              name="description"
              id="description"
              defaultValue={taskForAction.description}
              disabled
            />
          )}
          <NotesContainer>
            <Row $alignItems="center" $gap={4}>
              <HiOutlineDocumentText />
              <Title level={5}>{t<string>("Tasks.Notes")}</Title>
            </Row>
            <Stack $gap={8}>
              {task.value?.notes && task.value.notes.length > 0 ? (
                task.value.notes.map((noteItem) => (
                  <Note key={noteItem.id}>
                    <Text>{noteItem.note}</Text>
                  </Note>
                ))
              ) : (
                <Text>{t<string>("Tasks.NoNotes")}</Text>
              )}
            </Stack>
          </NotesContainer>
        </SectionHeader>
      </LeftCol>
      <RightCol>
        <Text noMargin>{t("TaskDetails.Due", { defaultValue: "Due" })}</Text>
        <DueDate>
          <HiOutlineCalendar />
          <Input
            type="date"
            disabled
            label={t<string>("Tasks.DueDate")}
            placeholder={t<string>("Tasks.DueDate")}
            name="due_date"
            id="due_date"
            value={format(new Date(taskForAction.due_date), "yyyy-MM-dd")}
          />
        </DueDate>
      </RightCol>
    </StyledRow>
  );
};
