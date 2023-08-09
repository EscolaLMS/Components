import { Button, Title, Text, List, Dropdown, Stack } from "../../..";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { API } from "@escolalms/sdk/lib";
import { t } from "i18next";
import {
  BookmarkNotesContainer,
  BookmarkNotesHeader,
  BookmarkNotesBody,
  BookmarkNotesMenu,
  BookmarkNotesContent,
  BookmarkNotesList,
  BookmarkNotesItem,
  NoteText,
  StyledTitle,
  BookmarksPage,
} from "./styles";
import { IconEdit, IconEditAlt, IconAll } from "../../../styleguide/Icons";
import styled, { withTheme } from "styled-components";

export interface Dropdown {
  id: number;
  content: ReactNode;
}

interface BookmarkNotesComponentProps {
  onClickBookmark: (
    courseId: number,
    lessonId: number,
    topicId: number
  ) => void;
  onDelete?: () => void;
}

const BookmarkNotes: FC<BookmarkNotesComponentProps> = ({
  onClickBookmark,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= lastPage;
  const [selectedListItem, setSelectedListItem] = useState(0);

  const { bookmarkNotes, fetchBookmarkNotes, deleteBookmarkNote } =
    useContext(EscolaLMSContext);

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
      icon: <IconAll />,
      text: t<string>("Bookmarks.All"),
      numberOfItems: bookmarkNotes.list?.data.length || 0,
    },
    {
      id: 1,
      icon: <IconEditAlt />,
      text: t<string>("Bookmarks.Notes"),
      numberOfItems: bookmarkNotes.list?.data.length
        ? Number(notes?.length)
        : 0,
    },
    {
      id: 2,
      icon: <IconEdit />,
      text: t<string>("Bookmarks.Bookmarks"),
      numberOfItems: bookmarkNotes.list?.data.length
        ? Number(bookmarks?.length)
        : 0,
    },
  ];

  const getArrayToMap = () => {
    switch (selectedListItem) {
      case 0:
        return bookmarkNotes.list?.data;
      case 1:
        return notes;
      case 2:
        return bookmarks;
    }
  };

  const handleBookmark = (id: number) =>
    deleteBookmarkNote(id).then(() => {
      fetchBookmarkNotes();
      onDelete && onDelete();
    });

  useEffect(() => {
    fetchBookmarkNotes({ page: currentPage, per_page: 25 });
    setLastPage(Number(bookmarkNotes.list?.meta.last_page));
  }, [fetchBookmarkNotes, currentPage]);

  return (
    <BookmarkNotesContainer>
      <BookmarkNotesHeader>
        <Title level={4}>{t<string>("Bookmarks.Title")}</Title>
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
          <BookmarkNotesList>
            {getArrayToMap()?.map((item: API.BookmarkNote) => {
              const { id, bookmarkable_type, value } = item;
              const bookmarkInfo = bookmarkable_type.split(":");
              const bookmark = bookmarkable_type
                .split("/")
                .map((num) => parseInt(num));
              return (
                <BookmarkNotesItem key={id}>
                  <Stack>
                    <StyledTitle
                      size="lg"
                      weight="medium"
                      onClick={() =>
                        onClickBookmark(bookmark[0], bookmark[1], bookmark[2])
                      }
                    >
                      {`${bookmarkInfo[1]} : ${bookmarkInfo[2]}`}
                    </StyledTitle>
                    {value && <NoteText>{value}</NoteText>}
                  </Stack>
                  <Button mode="outline" onClick={() => handleBookmark(id)}>
                    {t<string>("Bookmarks.Delete")}
                  </Button>
                </BookmarkNotesItem>
              );
            })}
          </BookmarkNotesList>
          {bookmarkNotes.list?.data.length === 0 && (
            <Text weight="light">{t<string>("Bookmarks.NoBookmarks")}</Text>
          )}
        </BookmarkNotesContent>
      </BookmarkNotesBody>
      <BookmarksPage>
        <Button
          type="button"
          mode="outline"
          disabled={previousDisabled}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {t<string>("Bookmarks.Prev")}
        </Button>

        <Title>{`${t<string>("Bookmarks.Page")} ${currentPage} / ${
          lastPage || 1
        }`}</Title>
        <Button
          type="button"
          mode="outline"
          disabled={nextDisabled}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {t<string>("Bookmarks.Next")}
        </Button>
      </BookmarksPage>
    </BookmarkNotesContainer>
  );
};

export default withTheme(styled(BookmarkNotes)``);
