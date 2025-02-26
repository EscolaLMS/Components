```js
import ThemeTester from "../../../styleguide/ThemeTester";

import { IconText, Icon } from "../../../";

const menuItems = [
  {
    id: 10,
    content: (
      <IconText
        icon={<Icon name="editAll" />}
        text="Edit"
        onClick={() => console.log("edit")}
      />
    ),
  },
  {
    id: 20,
    content: (
      <IconText
        icon={<Icon name="delete" />}
        text="Delete"
        onClick={() => console.log("delete")}
      />
    ),
  },
];

<ThemeTester>
  <DropdownMenu menuItems={menuItems} child={<Icon name="more" />} />
</ThemeTester>;
```
