```js
import ThemeTester from "../../../styleguide/ThemeTester";

<ThemeTester flexDirection={"column"}>
  <Dropdown
    options={[
      "dropdown option with long text 1",
      "dropdown option with long text 2",
      "dropdown option with text 3",
      "dropdown option with text 4",
    ]}
    placeholder="Select"
  />
  <Dropdown
    options={[
      "dropdown option with long text 1",
      "dropdown option with long text 2",
      "dropdown option with text 3",
      "dropdown option with text 4",
    ]}
    placeholder="Select"
    placement={"top"}
  />
  <Dropdown
    options={[
      { label: "item1", value: 1 },
      { label: "item2", value: 2 },
      { label: "item3", value: 3 },
      { label: "item4", value: 4 },
      { label: "item5", value: 5 },
      { label: "item6", value: 6 },
    ]}
    placeholder="Select from object"
  />
</ThemeTester>;
```
