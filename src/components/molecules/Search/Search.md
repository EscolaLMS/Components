```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./Search.png";

const onSearch = (value) => {
  console.log(`Search: ${value}`);
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
    >
      <div>football</div>
      <div>voleyball</div>
      <div>basketball</div>
    </Search>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
