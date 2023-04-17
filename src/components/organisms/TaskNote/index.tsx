import React, { useContext, useState, useCallback, useRef } from "react";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { useTranslation } from "react-i18next";
import { Button, Row, Spin, TextArea } from "../../../";
import { TaskNote } from "@escolalms/sdk/lib/types/api";
import { AddNoteWrapper } from "../TaskDetailsModal/content/common";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";

export const AddTaskNote: React.FC<{
  taskId: number;
  onSuccess: () => void;
}> = ({ taskId, onSuccess }) => {
  const { createTaskNote } = useContext(EscolaLMSContext);
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onAddNote = useCallback(() => {
    setLoading(true);
    createTaskNote(taskId, value)
      .then(() => {
        onSuccess();
        setValue("");
      })
      .finally(() => setLoading(false));
  }, [taskId, value]);

  return (
    <AddNoteWrapper>
      {loading && <Spin />}
      <TextArea
        name="note"
        label={t<string>("Tasks.Note")}
        placeholder={t<string>("Tasks.AddNote")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={Boolean(!value)}
        type="button"
        mode="secondary"
        onClick={() => onAddNote()}
      >
        {t<string>("Tasks.AddNote")}
      </Button>
    </AddNoteWrapper>
  );
};

export const EditTaskNote: React.FC<{
  note: TaskNote;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ note, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { updateTaskNote, deleteTaskNote } = useContext(EscolaLMSContext);
  const [value, setValue] = useState(note.note);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);
  console.log("ref", textAreaRef);
  const onEditNote = useCallback(() => {
    setLoading(true);
    updateTaskNote(note.task_id, note.id, value)
      .then(() => onEdit())
      .finally(() => setLoading(false));
  }, [note, value]);

  const onDeleteNote = useCallback(() => {
    const result = window.confirm("Are you sure you want to delete this note?");
    if (result) {
      setLoading(true);
      deleteTaskNote(note.id)
        .then(() => onDelete())
        .finally(() => setLoading(false));
    }
  }, [note]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div>
          <TextArea
            textAreaRef={textAreaRef}
            name="note"
            placeholder={t<string>("Tasks.EditNote")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Row $gap={6} $alignItems="center" $justifyContent="space-around">
            {value !== note.note && (
              <>
                <Button
                  mode="secondary"
                  type="button"
                  onClick={() => setValue(note.note)}
                >
                  {t<string>("Tasks.Undo")}
                </Button>
                <Button
                  mode="secondary"
                  type="button"
                  onClick={() => onEditNote()}
                >
                  {t<string>("Tasks.Save")}
                </Button>
              </>
            )}
            <Button
              mode="secondary"
              type="button"
              onClick={() => onDeleteNote()}
            >
              {t<string>("Tasks.Delete")}
            </Button>
          </Row>
        </div>
      )}
    </>
  );
};
