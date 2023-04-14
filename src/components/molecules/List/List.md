```js
import { useState } from "react";
import ThemeTester from "../../../styleguide/ThemeTester";
import { BiListCheck, BiListMinus, BiListPlus, BiListUl } from "react-icons/bi";

const [selectedListItem, setSelectedListItem] = useState(0);

const listItems = [
  {
    id: 0,
    icon: <BiListUl />,
    text: "All tasks",
    numberOfItems: 10,
  },
  {
    id: 1,
    icon: <BiListCheck />,
    text: "Today tasks",
    numberOfItems: 6,
  },
  {
    id: 2,
    icon: <BiListPlus />,
    text: "Upcoming tasks",
    numberOfItems: 2,
  },
  {
    id: 3,
    icon: <BiListMinus />,
    text: "Overdue tasks",
    numberOfItems: 2,
  },
];

<ThemeTester>
  <List
    listItems={listItems}
    selectedListItem={selectedListItem}
    setSelectedListItem={setSelectedListItem}
  />
</ThemeTester>;
```
