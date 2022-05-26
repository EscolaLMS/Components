```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./Search.png";

const onSearch = (value) => {
  console.log(`Search: ${value}`);
};

const onSubmit = (e) => {
  console.log("Submit: submit");
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
    >
      <option>option 1</option>
      <option>option 2</option>
      <option>option 3</option>
    </Search>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
