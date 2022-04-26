React component example:

### Default themes

```js
import img1 from "./Button.png";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Button>Primary Button</Button>
    <br />
    <Button mode="secondary">Secondary button</Button>
    <br />
    <Button mode="outline">Outline button</Button>
    <br />
    <Button disabled>Primary Button disabled</Button>
    <br />
    <Button mode="secondary" disabled>
      Secondary button disabled
    </Button>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
