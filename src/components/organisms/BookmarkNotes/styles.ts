import { getStylesBasedOnTheme } from "../../../utils/utils";
import { Title, Text } from "../../../";
import styled, { css } from "styled-components";

const defaultFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BookmarkNotesContainer = styled.div`
  margin: 30px 0px;
  display: flex;
  min-width: 100%;
  flex-direction: column;
  background: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
  overflow: auto;
  ::-webkit-scrollbar {
    width: 2px;
    border-radius: 2px;
    height: 2px;
    background-color: ${({ theme }) => theme.colorBackground};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.background};
    border-radius: 4px;
  }
`;
export const BookmarkNotesBody = styled.div`
  display: flex;
`;
export const BookmarkNotesHeader = styled.div`
  ${defaultFlex};
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.dm__primaryColor};
`;

export const BookmarksPage = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  border-top: 1px solid ${({ theme }) => theme.dm__primaryColor};
  & h1 {
    align-self: center;
  }
`;

export const IconWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.dm__primaryColor};
  padding: 4px;
`;

export const BookmarkNotesMenu = styled.div`
  border-right: 1px solid ${({ theme }) => theme.dm__primaryColor};
  width: 25%;
  padding: 12px 12px 12px 0px;
`;

export const BookmarkNotesContent = styled.div`
  width: 100%;
  padding: 24px 24px 24px 12px;
`;

export const BookmarkNotesList = styled.ul`
  margin: 0px;
  padding: 0px;
`;

export const BookmarkNotesItem = styled.li`
  ${defaultFlex};
  list-style: disc;
  margin-bottom: 12px;
  & label {
    display: flex;
    gap: 16px;
    & h2 {
      align-self: center;
    }
  }
  & > div {
    transition: 0.3s;
  }
  &:hover {
    & > div {
      transform: scale(1.02);
    }
  }
`;

export const NoteText = styled(Text)`
  text-transform: uppercase;
  margin: 0px;
  padding-top: 6px;
  font-size: 12px;
`;

export const StyledTitle = styled(Title)`
  cursor: pointer;
`;
