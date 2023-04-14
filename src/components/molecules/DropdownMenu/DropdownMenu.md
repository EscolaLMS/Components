```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { MdMoreHoriz, MdEditNote, MdDeleteForever } from "react-icons/md";
import { IconText } from "../../../";

const menuItems = [
  {
    id: 10,
    content: (
      <IconText
        icon={<MdEditNote />}
        text="Edit"
        onClick={() => console.log("edit")}
      />
    ),
  },
  {
    id: 20,
    content: (
      <IconText
        icon={<MdDeleteForever />}
        text="Delete"
        onClick={() => console.log("delete")}
      />
    ),
  },
];

<ThemeTester>
  <DropdownMenu menuItems={menuItems} child={<MdMoreHoriz size="1.6em" />} />
</ThemeTester>;
```
