TODO: style me

```jsx
import { ThemeTester } from "../../../styleguide";
import { Button } from "../../../";

const data = [
  {
    title: (
      <span>
        product <strong>1</strong>
      </span>
    ),
    date: "2022-02-02 20:20",
    price: "666.66 USD",
    actions: <Button mode="outline">request receipt</Button>,
  },
  {
    title: (
      <span>
        product <strong>2</strong>
      </span>
    ),
    date: "2022-02-02 20:20",
    price: "666.66 USD",
    actions: <Button mode="outline">request receipt</Button>,
  },
  {
    title: (
      <span>
        product <strong>3</strong>
      </span>
    ),
    date: "2022-02-02 20:20",
    price: "666.66 USD",
    actions: <Button mode="outline">request receipt</Button>,
  },
];

<ThemeTester childrenListStyle={{ display: "block" }}>
  <Orders data={data} />
  <hr />
  <Orders data={[]} />
</ThemeTester>;
```
