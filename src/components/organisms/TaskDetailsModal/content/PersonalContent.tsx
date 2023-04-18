import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { format, isAfter } from "date-fns";
import { Formik, FormikErrors } from "formik";
import { Task, TaskNote } from "@escolalms/sdk/lib/types/api";
import { AddTaskNote, EditTaskNote } from "../../TaskNote";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Button, Checkbox, Input, Row, Text, TextArea } from "../../../../";
import {
  RelatedTreeSelect,
  RelatedValue,
} from "../../../molecules/RelatedTreeSelect";
import {
  LeftCol,
  RightCol,
  SectionHeader,
  Note,
  NotesContainer,
} from "./common";

interface UpdateTaskFormValues {
  title: string;
  description: string;
  note?: string;
  due_date?: string;
  related?: RelatedValue;
  error?: string;
}

interface Props {
  taskForAction: Task;
  closeModal: () => void;
  onStatusUpdateSuccess?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

const Form = styled.form`
  display: flex;
  height: calc(100% - 50px);
`;

const ButtonsContainer = styled(Row)`
  width: 100%;
`;

export const PersonalContent: React.FC<Props> = ({
  taskForAction,
  closeModal,
  onStatusUpdateSuccess,
  onSuccess,
  onError,
}) => {
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [taskDone, setTaskDone] = useState(!!taskForAction.completed_at);
  const { t } = useTranslation();
  const { updateTask, updateTaskStatus, createTaskNote, fetchTask, task } =
    useContext(EscolaLMSContext);

  const initialValues = {
    title: taskForAction.title,
    related:
      taskForAction.related_type && taskForAction.related_id
        ? `${taskForAction.related_type}:${taskForAction.related_id}`
        : undefined,
    description: taskForAction.description ?? "",
    due_date: taskForAction.due_date,
  } as UpdateTaskFormValues;

  useEffect(() => {
    fetchTask(taskForAction.id);
  }, [fetchTask, taskForAction.id]);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: FormikErrors<
          UpdateTaskFormValues & Record<string, string>
        > = {};

        if (!values.title) {
          errors.title = t("Required");
        }
        if (!values.due_date) {
          errors.due_date = t("Required");
        } else if (!isAfter(new Date(values.due_date), new Date())) {
          errors.due_date = t("DateAfterToday");
        }

        return errors;
      }}
      onSubmit={(
        { related, due_date, ...values },
        { setSubmitting, setErrors }
      ) => {
        let sendValues: UpdateTaskFormValues & Record<string, string> = {
          ...values,
        };

        if (due_date) {
          sendValues = {
            ...sendValues,
            due_date: format(new Date(due_date!), "yyyy-MM-dd"),
          };
        }

        if (related && related.includes(":")) {
          const [related_type, related_id] = related.split(":");
          sendValues = { ...sendValues, related_type, related_id };
        }

        updateTask(taskForAction.id, sendValues)
          .then(() => {
            values.note && createTaskNote(taskForAction.id, values.note);
            onSuccess?.();
            closeModal();
          })
          .catch((err) => {
            if (err.data && err.data.errors) {
              setErrors(
                Object.keys(values).reduce((acc, curr) => {
                  if (err.data.errors[curr]) {
                    return { ...acc, [curr]: err.data.errors[curr] };
                  }
                  return acc;
                }, {})
              );
            }
            onError?.();
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <LeftCol>
            <Row $gap={16}>
              <Checkbox
                disabled={isStatusUpdating}
                checked={taskDone}
                onChange={(e) => {
                  setIsStatusUpdating(true);
                  updateTaskStatus(taskForAction.id, e.target.checked)
                    .then(() => {
                      onStatusUpdateSuccess?.();
                      fetchTask(+taskForAction.id);
                      setIsStatusUpdating(false);
                      setTaskDone(!taskDone);
                    })
                    .catch(() => setIsStatusUpdating(false));
                }}
              />
              <SectionHeader>
                <Input
                  label={t<string>("Tasks.Title")}
                  error={
                    touched.title && errors.title ? (
                      <p>{errors.title}</p>
                    ) : undefined
                  }
                  placeholder={t<string>("Tasks.Title")}
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <TextArea
                  name="description"
                  id="description"
                  label={t<string>("Tasks.Description")}
                  placeholder={t<string>("Tasks.Description")}
                  value={values.description}
                  onChange={handleChange}
                />
                <RelatedTreeSelect
                  label={t<string>("Tasks.RelatesTo")}
                  notFoundContent={t<string>("Tasks.NoContent")}
                  error={
                    touched.related && errors.related
                      ? errors.related
                      : undefined
                  }
                  id="related"
                  value={values.related}
                  onChange={(v) => setFieldValue("related", v)}
                  onBlur={handleBlur}
                />
                <NotesContainer>
                  <Row $alignItems="center" $gap={4}>
                    <HiOutlineDocumentText />
                    <Text>{t<string>("Tasks.Notes")}</Text>
                  </Row>
                  <div>
                    {task.value?.notes && task.value.notes.length > 0 ? (
                      task.value.notes.map((note: TaskNote) => (
                        <Note key={note.id}>
                          <EditTaskNote
                            note={note}
                            onEdit={() => fetchTask(taskForAction.id)}
                            onDelete={() => fetchTask(taskForAction.id)}
                          />
                        </Note>
                      ))
                    ) : (
                      <Text>{t<string>("Tasks.NoNotes")}</Text>
                    )}
                  </div>
                </NotesContainer>
                <AddTaskNote
                  taskId={taskForAction.id}
                  onSuccess={() => fetchTask(taskForAction.id)}
                />
              </SectionHeader>
            </Row>
            <ButtonsContainer $justifyContent="flex-end" $gap={12}>
              <Button mode="secondary" type="button" onClick={closeModal}>
                {t<string>("Tasks.Cancel")}
              </Button>
              <Button mode="secondary" type="submit">
                {t<string>("Tasks.Save")}
              </Button>
            </ButtonsContainer>
          </LeftCol>
          <RightCol>
            <Input
              type="date"
              error={
                touched.due_date && errors.due_date ? (
                  <p>{errors.due_date}</p>
                ) : undefined
              }
              label={t<string>("Tasks.DueDate")}
              placeholder={t<string>("Tasks.DueDate")}
              name="due_date"
              id="due_date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={format(
                values.due_date ? new Date(values.due_date) : new Date(),
                "yyyy-MM-dd"
              )}
            />
          </RightCol>
        </Form>
      )}
    </Formik>
  );
};
