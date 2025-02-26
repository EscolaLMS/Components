```js
import { useState } from "react";
import ThemeTester from "../../../styleguide/ThemeTester";

import { IconText, Icon } from "../../../";
const [selectedListItem, setSelectedListItem] = useState(0);

const listItems = [
  {
    id: 0,
    icon: <Icon name="list" />,
    text: "All tasks",
    numberOfItems: 10,
  },
  {
    id: 1,
    icon: <Icon name="listCheck" />,
    text: "Today tasks",
    numberOfItems: 6,
  },
  {
    id: 2,
    icon: <Icon name="listAdd" />,
    text: "Upcoming tasks",
    numberOfItems: 2,
  },
  {
    id: 3,
    icon: <Icon name="listSubstract" />,
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
