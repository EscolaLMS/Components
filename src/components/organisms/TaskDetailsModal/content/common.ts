import { Checkbox, Input } from '../../../../';
import styled from 'styled-components';
import { getStylesBasedOnTheme } from '../../../../utils/utils';

export const LeftCol = styled.div`
  flex-basis: 72.5%;
  justify-content: space-between;
  gap: 16px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.dm__primaryColor};
  padding: 24px;
`;

export const RightCol = styled.div`
  flex-basis: 27.5%;
  padding: 24px;
`;

export const StyledCheckbox = styled(Checkbox)`
  & label {
    display: flex;
    gap: 16px;
    user-select: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  & > * {
    width: 100%;
  }
`;

export const LeftPaddingWrapper = styled.div`
  width: 100%;
  padding: 0px 36px;
`;

export const ResponsiveCalendarSelect = styled(Input)`
  width: 100%;
`;

export const NotesContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  & > div {
    width: 100%;
    max-height: 380px;
    overflow: auto;
  }
  & p {
    line-height: normal;
  }
`;

export const Note = styled.div`
  display: flex;
  min-width: 100%;
  margin: 4px 0px;
  & > div:first-child {
    display: flex;
    width: 100%;
    background-color: ${({ theme }) => getStylesBasedOnTheme(theme.mode, theme.gray3, theme.gray3)};
    :hover {
      color: ${({ theme }) => theme.dm__colorBackground};
    }
    & button {
      width: auto;
      transition: 0.3s;
      padding: 6px;
      margin: 4px 6px;
      margin-left: 0px;
      :hover {
        color: ${({ theme }) => theme.dm__background};
      }
      & picture svg {
        color: ${({ theme }) => theme.dm__colorBackground};
      }
    }
    & textarea {
      min-height: 100%;
      min-width: 75%;
      border: none;
      color: ${({ theme }) => getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
      background-color: ${({ theme }) => getStylesBasedOnTheme(theme.mode, theme.gray3, theme.gray3)};
      cursor: pointer;

      &:focus {
        color: ${({ theme }) => theme.dm__colorBackground};
        outline: none;
        cursor: text;
      }
    }
  }

`;

export const AddNoteWrapper = styled.div`
  width: 100%;

  button {
    margin: 12px 0px;
    width: max-content;
  }
`;

