import {
  NewNoteData,
  NoteData,
} from "components/molecules/CourseTopNav/CourseTopNav";
import { Button, Title, TextArea } from "../../../";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { Formik, FormikErrors } from "formik";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";

interface NoteModalProps {
  currentNote?: NoteData;
  newNoteData: NewNoteData;
  onClose: () => void;
}

const Header = styled.header`
  padding-bottom: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.primaryColor};
  margin-bottom: 24px;
`;

const NoteModalWrapper = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 26px;
`;

const ModalNote: FC<NoteModalProps> = ({
  currentNote,
  newNoteData,
  onClose,
}) => {
  const initialValues = {
    noteValue: currentNote ? currentNote.value : "",
  };
  const { fetchBookmarkNotes, createBookmarkNote, updateBookmarkNote } =
    useContext(EscolaLMSContext);

  const { t } = useTranslation();

  return (
    <NoteModalWrapper>
      <Header>
        <Title>{t<string>("Bookmarks.Notes")}</Title>
      </Header>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: FormikErrors<{ noteValue: string }> = {};

          if (!values.noteValue) {
            errors.noteValue = "Required";
          }
          return errors;
        }}
        onSubmit={(values) => {
          currentNote
            ? updateBookmarkNote(currentNote.id, {
                value: values.noteValue,
                bookmarkable_id: currentNote.bookmarkable_id,
                bookmarkable_type: currentNote.bookmarkable_type,
              }).then(() => {
                fetchBookmarkNotes(), onClose();
              })
            : createBookmarkNote({
                value: values.noteValue,
                bookmarkable_id: newNoteData?.id,
                bookmarkable_type: newNoteData?.type,
              }).then(() => {
                fetchBookmarkNotes(), onClose();
              });
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextArea
              name="noteValue"
              id="noteValue"
              label={t("Note.yourNote", {
                defaultValue: "Your note",
              })}
              placeholder={
                t("Note.yourNote", {
                  defaultValue: "Write a note...",
                }) ?? undefined
              }
              value={values.noteValue}
              onChange={handleChange}
            />
            <ButtonsWrapper>
              <Button type="button" mode="secondary" onClick={onClose}>
                {t<string>("Bookmarks.Cancel")}
              </Button>
              <Button type="submit" mode="secondary" disabled={isSubmitting}>
                {t<string>(`Bookmarks.${currentNote ? "Update" : "Add"}`)}
              </Button>
            </ButtonsWrapper>
          </form>
        )}
      </Formik>
    </NoteModalWrapper>
  );
};

export default withTheme(styled(ModalNote)``);
