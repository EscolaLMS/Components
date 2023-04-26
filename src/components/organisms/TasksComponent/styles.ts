import { getStylesBasedOnTheme } from '../../../utils/utils';
import { Title, Text } from '../../../';
import styled, { css } from 'styled-components';

const defaultFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
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
export const TasksBody = styled.div`
  display: flex;
  width: 100%;
`;
export const TasksHeader = styled.div`
  ${defaultFlex};
  padding: 12px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.dm__primaryColor};
`;

export const TasksContentHeader = styled.div`
  ${defaultFlex};
  margin-bottom: 12px;
`;
export const TasksMenu = styled.div`
  border-right: 1px solid ${({ theme }) => theme.dm__primaryColor};
  min-width: fit-content;
  padding: 12px 12px 12px 0px;
`;
export const TasksContent = styled.div`
  width: 100%;
  padding: 24px 0 24px 24px;
`;

export const TaskItem = styled.div`
  ${defaultFlex};
  margin-bottom: 12px;
  & label {
    display: flex;
    gap: 16px;
    & h2 {
      align-self: center;
    }
  }
`;

export const DropdownOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  & span {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
`;

export const TaskDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;

export const StyledTitle = styled(Title)<{ $isCompleted: boolean }>`
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? 'line-through' : 'none'};
`;

export const ProgrammeText = styled(Text)`
  text-transform: uppercase;
  margin: 0px;
  padding-top: 6px;
  font-size: 12px;
`;
export const TaskDate = styled.div<{
  $date?: 'Today' | 'Tomorrow' | 'Upcoming' | 'Overdue';
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  p,
  picture {
    color: ${({ $date, theme }) =>
      ['Today', 'Overdue'].includes($date ?? '')
        ? theme.errorColor
        : theme.positive};
  }
`;
