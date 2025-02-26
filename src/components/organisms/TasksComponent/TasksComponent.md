```jsx
import { useState } from "react";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../../styleguide";
import { IconText, Icon } from "../../../";

const [sort, setSort] = useState("Ascending");
const [createBy, setCreateBy] = useState("Personal");
const [showDone, setShowDone] = useState(true);

const taskShowAction = [
  {
    id: 1,
    content: (
      <IconText
        icon={showDone ? <Icon name="finished" /> : <Icon name="close" />}
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
        icon={<Icon name="editAll" />}
        text="Ascending"
        onClick={() => setSort("Ascending")}
      />
    ),
  },
  {
    id: 1,
    content: (
      <IconText
        icon={<Icon name="editAll" />}
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
        icon={<Icon name="editAll" />}
        text="Personal"
        onClick={() => setCreateBy("Personal")}
      />
    ),
  },
  {
    id: 1,
    content: (
      <IconText
        icon={<Icon name="editAll" />}
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
      sortOptions={{ options: sortType, type: sort }}
      createBy={{ options: taskCreateBy, type: createBy }}
      tasksPagination={{
        previousDisabled: true,
        nextDisabled: true,
        currentPage: 1,
        lastPage: 1,
        setCurrentPage: () => console.log(),
      }}
    />
  </EscolaLMSContextProvider>
</ThemeTester>;
```
