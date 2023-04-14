import { FC, HTMLAttributes, ReactNode } from "react";
import styled, { withTheme } from "styled-components";
import { IconText, Text } from "../../..";

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

const List: FC<ListProps> = ({
  listItems,
  selectedListItem,
  setSelectedListItem,
  ...props
}) => {
  return (
    <ListComponent data-testid="list" {...props}>
      {listItems.map(({ id, icon, text, numberOfItems }) => (
        <ListItem
          key={id}
          $isActive={selectedListItem === id}
          data-testid={text}
          onClick={() => setSelectedListItem(id)}
        >
          <IconText icon={icon} text={text} noMargin />
          <Text>{numberOfItems}</Text>
        </ListItem>
      ))}
    </ListComponent>
  );
};

export default withTheme(styled(List)``);
