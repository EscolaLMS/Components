```js
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./NoteEditor.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<>
  <ThemeTester>
    <NoteEditor
      onSuccess={() => console.log("Success")}
      onError={() => console.log("Error")}
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</>;
```
