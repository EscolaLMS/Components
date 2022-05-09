```js
import img1 from "./CommentBar.png";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <CommentBar current={1} max={1} />
    <CommentBar current={39} max={50} />
    <CommentBar current={30} max={100} />
    <CommentBar current={15} max={100} />
    <CommentBar current={5} max={100} />
    <CommentBar current={0} max={100} />
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
