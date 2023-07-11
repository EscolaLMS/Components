```js
import { ThemeTester } from "../../../styleguide";
import { useState } from "react";
import img1 from "./Search.png";

const [loading, setLoading] = useState(false);

const onSearch = (value) => {
  console.log(`Search: ${value}`);
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
};

const onSubmit = (value) => {
  console.log(`Submit ${value}`);
};

const onChange = (value) => {
  console.log(`Change: ${value}`);
};

<React.Fragment>
  <ThemeTester>
    <Search
      onSubmit={(e) => onSubmit(e)}
      onChange={(e) => onChange(e)}
      onSearch={(e) => onSearch(e)}
      placeholder="Select a course"
      loading={loading}
    >
      <div>football</div>
      <div>voleyball</div>
      <div>basketball</div>
    </Search>
  </ThemeTester>
</React.Fragment>;
```
