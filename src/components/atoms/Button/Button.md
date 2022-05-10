React component example:

### Default themes

```js
import img1 from "./Button.png";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Button>Primary Button</Button>
    <Button loading>Primary Button loading</Button>
    <Button loading block>
      Primary block Button loading
    </Button>
    <Button mode="secondary">Secondary button</Button>
    <Button mode="outline">Outline button</Button>
    <Button loading mode="outline">
      Outline button loading
    </Button>

    <Button disabled>Primary Button disabled</Button>
    <Button mode="secondary" disabled>
      Secondary button disabled
    </Button>
    <Button invert>Invert button</Button>
    <Button mode="secondary" invert>
      Secondary Invert button
    </Button>
    <Button mode="outline" invert>
      Outline Invert button
    </Button>
    <Button disabled invert>
      Primary Invert Button disabled
    </Button>
    <Button mode="secondary" disabled invert>
      Secondary Invert Button disabled
    </Button>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
