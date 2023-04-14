import { Checkbox, Input } from '../../../../';
import { add, endOfDay, endOfToday } from 'date-fns';
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
  padding-left: 36px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.outlineButtonColor};
  color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  line-height: 130%;
  resize: none;
  transition: border-color 200ms ease-in-out;
`;

export const ResponsiveCalendarSelect = styled(Input)`
  width: 100%;
`;

export const NotesContainer = styled.div`
padding: 12px 0px;
  width: 100%;
  & > div {
    & div {
      margin: 4px 0;
    }
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

  & > div:first-child {
    display: flex;
    width: 100%;
    padding: 4px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.dm__background};
    :hover {
      color: ${({ theme }) => theme.dm__colorBackground};
    }
    & button {
      width: auto;
      transition: 0.3s;
      padding: 6px;
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
      margin-block: 4px;
      border: none;
      background-color: ${({ theme }) => theme.dm__background};
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

export const getSelectDates = () => {
  const today = endOfToday();
  const tomorrow = add(today, { days: 1 }).toString();
  const nextWeek = add(today, { weeks: 1 }).toString();

  return { today: today.toString(), tomorrow, nextWeek };
};

export const getDueDate = (dueDate: string): string => {
  const endOfDayDueDateStr = endOfDay(new Date(dueDate)).toString();
  const { today, tomorrow, nextWeek } = getSelectDates();

  const dueDateMap = {
    [today]: today,
    [tomorrow]: tomorrow,
    [nextWeek]: nextWeek,
  };

  return dueDateMap[endOfDayDueDateStr] ?? dueDate;
};
