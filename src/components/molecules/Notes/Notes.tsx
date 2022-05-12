import * as React from "react";
import styled from "styled-components";
import { ReactNode } from "react";
import { NoteProps, Note } from "../../atoms/Note/Note";
import { IconTitle } from "../../atoms/IconTitle/IconTitle";
import Text from "../../atoms/Typography/Text";
import { Button } from "../../atoms/Button/Button";

const NoteIcon = () => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5013 0.833496H1.5013C1.28029 0.833496 1.06833 0.921293 0.912046 1.07757C0.755766 1.23385 0.667969 1.44582 0.667969 1.66683V18.3335C0.667969 18.5545 0.755766 18.7665 0.912046 18.9228C1.06833 19.079 1.28029 19.1668 1.5013 19.1668H13.168C13.2775 19.1664 13.3859 19.1446 13.4871 19.1027C13.5884 19.0608 13.6805 18.9993 13.758 18.9218L17.0913 15.5885C17.2382 15.4265 17.3242 15.2186 17.3346 15.0002V1.66683C17.3346 1.44582 17.2468 1.23385 17.0906 1.07757C16.9343 0.921293 16.7223 0.833496 16.5013 0.833496ZM12.3346 15.0002V17.5002H2.33464V2.50016H15.668V14.1668H13.168C12.947 14.1668 12.735 14.2546 12.5787 14.4109C12.4224 14.5672 12.3346 14.7791 12.3346 15.0002ZM13.168 8.3335C13.168 8.55451 13.0802 8.76647 12.9239 8.92275C12.7676 9.07903 12.5556 9.16683 12.3346 9.16683H5.66797C5.44696 9.16683 5.23499 9.07903 5.07871 8.92275C4.92243 8.76647 4.83464 8.55451 4.83464 8.3335C4.83464 8.11248 4.92243 7.90052 5.07871 7.74424C5.23499 7.58796 5.44696 7.50016 5.66797 7.50016H12.3346C12.5556 7.50016 12.7676 7.58796 12.9239 7.74424C13.0802 7.90052 13.168 8.11248 13.168 8.3335ZM9.83464 11.6668C9.83464 11.8878 9.74684 12.0998 9.59056 12.2561C9.43428 12.4124 9.22232 12.5002 9.0013 12.5002H5.66797C5.44696 12.5002 5.23499 12.4124 5.07871 12.2561C4.92243 12.0998 4.83464 11.8878 4.83464 11.6668C4.83464 11.4458 4.92243 11.2339 5.07871 11.0776C5.23499 10.9213 5.44696 10.8335 5.66797 10.8335H9.0013C9.22232 10.8335 9.43428 10.9213 9.59056 11.0776C9.74684 11.2339 9.83464 11.4458 9.83464 11.6668Z"
        fill="currentColor"
      />
    </svg>
  );
};

const PlusIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9987 0.333496C7.45893 0.333496 7.83203 0.706592 7.83203 1.16683V6.16683H12.832C13.2923 6.16683 13.6654 6.53993 13.6654 7.00017C13.6654 7.4604 13.2923 7.8335 12.832 7.8335H7.83203V12.8335C7.83203 13.2937 7.45893 13.6668 6.9987 13.6668C6.53846 13.6668 6.16536 13.2937 6.16536 12.8335V7.8335H1.16536C0.705127 7.8335 0.332031 7.4604 0.332031 7.00017C0.332031 6.53993 0.705127 6.16683 1.16536 6.16683H6.16536V1.16683C6.16536 0.706592 6.53846 0.333496 6.9987 0.333496Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface NoteGroup {
  title: ReactNode;
  notes: NoteProps[];
}

export interface NotesProps {
  noteGroups: NoteGroup[];
  onAddNoteClick: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const StyledNotes = styled.div`
  .title {
    margin-bottom: 0;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export const Notes: React.FC<NotesProps> = (props) => {
  const { noteGroups, onAddNoteClick } = props;

  return (
    <StyledNotes>
      {noteGroups.map((noteGroup) => {
        return (
          <>
            <IconTitle
              level={4}
              title={"Notatki"}
              icon={<NoteIcon />}
              as={"h4"}
            />
            <div className="title-container">
              <Text className="title">{noteGroup.title}</Text>
              <Button mode="outline" onClick={onAddNoteClick}>
                <PlusIcon />
                Dodaj nową
              </Button>
            </div>

            {noteGroup.notes.map((note) => {
              return <Note {...note} />;
            })}
          </>
        );
      })}
    </StyledNotes>
  );
};
