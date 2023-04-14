```js
import ThemeTester from "../../../styleguide/ThemeTester";

const treeData = [
  {
    title: "test1",
    value: "test1",
    children: [
      {
        title: "test1-1",
        label: "test1 - test1-1",
        value: "test1-1",
        children: [
          {
            title: "test1-1-1",
            label: "test1 - test1-1 - test1-1-1",
            value: "test1-1-1",
            children: [
              {
                title: "test1-1-1-1",
                label: "test1 - test1-1 - test1-1-1 - test1-1-1-1",
                value: "test1-1-1-1",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "test2",
    label: "test2",
    value: "test2",
    children: [
      {
        title: "test2-1",
        label: "test2 - test2-1",
        value: "test2-1",
      },
      {
        title: "test2-2",
        label: "test2 - test2-2",
        value: "test2-2",
        children: [
          {
            title: "test2-2-1",
            label: "test2 - test2-2 - test2-2-1",
            value: "test2-2-1",
          },
        ],
      },
      {
        title: "test2-3",
        label: "test2 - test2-3",
        value: "test2-3",
      },
    ],
  },
  { title: "test3", value: "test3" },
  { title: "test4", value: "test4" },
  { title: "test5", value: "test5" },
];

<ThemeTester>
  <TreeSelect treeData={treeData} />
</ThemeTester>;
```
