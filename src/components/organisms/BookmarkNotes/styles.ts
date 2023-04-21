import { getStylesBasedOnTheme } from '../../../utils/utils';
import { Title, Text } from '../../../';
import styled, { css } from 'styled-components';

const defaultFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BookmarkNotesContainer = styled.div`
  margin: 24px auto;
  padding: 24px;
  background: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
  border-radius: 24px;
  height: calc(100vh - 120px);
  max-width: 1392px;
  overflow: auto;
`;
export const BookmarkNotesBody = styled.div`
  display: flex;
  width: 100%;
`;
export const BookmarkNotesHeader = styled.div`
  ${defaultFlex};
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.dm__primaryColor};
`;

export const BookmarkNotesTitle = styled.div`
  ${defaultFlex};
  gap: 16px;
`;

export const BookmarkNotesContentHeader = styled.div`
  ${defaultFlex};
  margin-bottom: 24px;
  & h1 {
    width: 30%;
  }
`;
export const IconWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.dm__primaryColor};
  padding: 4px;;
`;
export const BookmarkNotesMenu = styled.div`
  border-right: 1px solid ${({ theme }) => theme.dm__primaryColor};
  width: 25%;
  padding: 24px 24px 24px 0;
`;
export const BookmarkNotesContent = styled.div`
  width: 100%;
  padding: 24px 0 24px 24px;
`;

export const BookmarkNotesItem = styled.li`
  ${defaultFlex};
  list-style: disc;
  margin-bottom: 32px;
  & label {
    display: flex;
    gap: 16px;
    & h2 {
      align-self: center;
    }
  }
`;

export const NoteText = styled.p`
  text-transform: uppercase;
`;

export const StyledTitle = styled(Title)`
  cursor: pointer;
`;
