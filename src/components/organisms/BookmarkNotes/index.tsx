import { Button, Title, Text, List, Dropdown, Stack } from "../../..";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { API } from "@escolalms/sdk/lib";
import { t } from "i18next";
import {
  BookmarkNotesContainer,
  BookmarkNotesHeader,
  BookmarkNotesTitle,
  BookmarkNotesBody,
  BookmarkNotesMenu,
  BookmarkNotesContent,
  BookmarkNotesContentHeader,
  BookmarkNotesItem,
  NoteText,
  StyledTitle,
} from "./styles";

export interface Dropdown {
  id: number;
  content: ReactNode;
}

interface BookmarkNotesComponentProps {
  closeButton: any;

  programmeItems?: Dropdown[];
  sortItems?: { options: Dropdown[]; type: string };
  taskShowAction?: {
    options: { id: number; content: ReactNode }[];
    showDone: boolean;
  };
  taskData?: API.Task;
  onTaskDetailsModalClose?: () => void;
  onClickBookmark: (courseId: number, topicId: number) => void;
}

export const BookmarkNotes: FC<BookmarkNotesComponentProps> = ({
  closeButton,
  onClickBookmark,
}) => {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const {
    fetchBookmarkNotes,
    bookmarkNotes,
    deleteBookmarkNote,
    notifications,
  } = useContext(EscolaLMSContext);

  const bookmarks = useMemo(
    () => bookmarkNotes.list?.data.filter((item) => item.value === null),
    [bookmarkNotes.list?.data]
  );

  const notes = useMemo(
    () => bookmarkNotes.list?.data.filter((item) => item.value),
    [bookmarkNotes.list?.data]
  );

  const listItems = [
    {
      id: 0,
      iconName: "editSquare",
      text: "Notes",
      numberOfTasks: bookmarkNotes.list?.data.length
        ? Number(notes?.length)
        : 0,
    },
    {
      id: 1,
      iconName: "plus",
      text: "Bookmarks",
      numberOfTasks: bookmarkNotes.list?.data.length
        ? Number(bookmarks?.length)
        : 0,
    },
  ];
  const currentlySelectedListItem = listItems.find(
    ({ id }) => id === selectedListItem
  );

  const getArrayToMap = () => (selectedListItem === 0 ? notes : bookmarks);

  const handleBookmark = (id: number) =>
    deleteBookmarkNote(id).then(() => fetchBookmarkNotes());

  useEffect(() => {
    fetchBookmarkNotes();
  }, [fetchBookmarkNotes, notifications]);

  return (
    <>
      <BookmarkNotesContainer data-testid="bookmark-container">
        <BookmarkNotesHeader>
          <BookmarkNotesTitle>
            <Title>
              {t("BookmarkNotes.Title", {
                defaultValue: "Bookmarks and notes",
              })}
            </Title>
          </BookmarkNotesTitle>
          <Button variant="secondary" onClick={closeButton?.onClick}>
            {"Button?"}
          </Button>
        </BookmarkNotesHeader>
        <BookmarkNotesBody>
          <BookmarkNotesMenu>
            <List
              listItems={listItems}
              selectedListItem={selectedListItem}
              setSelectedListItem={setSelectedListItem}
            />
          </BookmarkNotesMenu>
          <BookmarkNotesContent>
            <BookmarkNotesContentHeader>
              <Title>{currentlySelectedListItem?.text}</Title>
            </BookmarkNotesContentHeader>
            <ul>
              {getArrayToMap()?.map((item: API.BookmarkNote) => {
                const { id, bookmarkable_id, bookmarkable_type, value } = item;
                const bookmarkInfo = bookmarkable_type.split(":");
                return (
                  <BookmarkNotesItem key={id}>
                    <Stack>
                      <StyledTitle
                        size="lg"
                        weight="medium"
                        onClick={() =>
                          onClickBookmark(
                            Number(bookmarkInfo[0]),
                            bookmarkable_id
                          )
                        }
                      >
                        {`${bookmarkInfo[1]} : ${bookmarkInfo[2]}`}
                      </StyledTitle>
                      {value && <NoteText>{value}</NoteText>}
                    </Stack>
                    <Button
                      variant="secondary"
                      onClick={() => handleBookmark(id)}
                    >
                      {"Close"}
                    </Button>
                  </BookmarkNotesItem>
                );
              })}
            </ul>
            {bookmarkNotes.list?.data.length === 0 && (
              <Text $color="neutral600" weight="light">
                {t("Bookmarks.noBookmarks", {
                  defaultValue: "There is nothing on this list...",
                })}
              </Text>
            )}
          </BookmarkNotesContent>
        </BookmarkNotesBody>
      </BookmarkNotesContainer>
    </>
  );
};
