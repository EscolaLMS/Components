```jsx
import { useState } from "react";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../../styleguide";
import { IconText } from "../../../";
import {
  MdMoreHoriz,
  MdEditNote,
  MdDeleteForever,
  MdCheck,
  MdClose,
} from "react-icons/md";

const [sort, setSort] = useState("Ascending");
const [createBy, setCreateBy] = useState("Personal");
const [showDone, setShowDone] = useState(true);

const taskShowAction = [
  {
    id: 1,
    content: (
      <IconText
        icon={showDone ? <MdCheck size="1.6em" /> : <MdClose size="1.6em" />}
        text="Tasks.ShowDone"
        onClick={() => setShowDone(!showDone)}
      />
    ),
  },
];

const sortType = [
  {
    id: 0,
    content: (
      <IconText
        icon={<MdEditNote />}
        text="Ascending"
        onClick={() => setSort("Ascending")}
      />
    ),
  },
  {
    id: 1,
    content: (
      <IconText
        icon={<MdEditNote />}
        text="Descending"
        onClick={() => setSort("Descending")}
      />
    ),
  },
];

const taskCreateBy = [
  {
    id: 0,
    content: (
      <IconText
        icon={<MdEditNote />}
        text="Personal"
        onClick={() => setCreateBy("Personal")}
      />
    ),
  },
  {
    id: 1,
    content: (
      <IconText
        icon={<MdEditNote />}
        text="Incoming"
        onClick={() => setCreateBy("Incoming")}
      />
    ),
  },
];

<ThemeTester>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <TasksComponent
      taskShowAction={{ options: taskShowAction, showDone: showDone }}
      programmeItems={[]}
      sortOptions={{ options: sortType, type: sort }}
      createBy={{ options: taskCreateBy, type: createBy }}
    />
  </EscolaLMSContextProvider>
</ThemeTester>;
```
