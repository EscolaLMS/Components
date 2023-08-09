import { FC, HTMLAttributes, ReactNode } from "react";
import styled, { css, withTheme } from "styled-components";
import { IconText, Text } from "../../..";
import { getStylesBasedOnTheme } from "../../../utils/utils";
export interface ListItemProps {
  id: number;
  text: string;
  icon: ReactNode;
  numberOfItems: number;
}

interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, "onClick"> {
  listItems: ListItemProps[];
  selectedListItem: number;
  setSelectedListItem: (i: number) => void;
  defaultSelectedId?: number;
  currentIndex?: number;
}
const basicColorStyle = css<{ $isActive?: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.white
      : getStylesBasedOnTheme(
          theme.mode,
          theme.dm__outlineButtonColor,
          theme.outlineButtonColor,
          theme.primaryColor
        )};
`;

const ListComponent = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0px;
`;

const ListItem = styled.li<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.dm__primaryColor : "transparent"};
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledText = styled(Text)<{ $isActive?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  ${basicColorStyle}
`;

const StyledIconText = styled(IconText)<{ $isActive?: boolean }>`
  & > span {
    font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
    ${basicColorStyle}
    & > svg {
      fill: ${({ theme, $isActive }) =>
        $isActive
          ? theme.white
          : getStylesBasedOnTheme(
              theme.mode,
              theme.dm__outlineButtonColor,
              theme.outlineButtonColor,
              theme.primaryColor
            )};
    }
  }
`;
const List: FC<ListProps> = ({
  listItems,
  selectedListItem,
  setSelectedListItem,
  ...props
}) => (
  <ListComponent data-testid="list" {...props}>
    {listItems.map(({ id, icon, text, numberOfItems }) => (
      <ListItem
        key={id}
        $isActive={selectedListItem === id}
        data-testid={text}
        onClick={() => setSelectedListItem(id)}
      >
        <StyledIconText
          icon={icon}
          text={text}
          noMargin
          $isActive={selectedListItem === id}
        />
        <StyledText $isActive={selectedListItem === id}>
          {numberOfItems}
        </StyledText>
      </ListItem>
    ))}
  </ListComponent>
);

export default withTheme(styled(List)``);
