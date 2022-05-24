```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Badge } from "../../../";

import img1 from "./ImageBubble.png";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <div style={{ width: 600 }}>
      <ImageBubble
        image={{
          src: "https://placekitten.com/g/600/600",
          alt: "the kitten",
        }}
        header={
          <div style={{ textAlign: "right" }}>
            <Badge>Bestseller</Badge>
          </div>
        }
      >
        <div>bottom (TODO: replace this when CourseCard is ready)</div>
      </ImageBubble>
    </div>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
