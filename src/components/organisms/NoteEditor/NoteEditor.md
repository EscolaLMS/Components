```js
import img1 from "./NoteEditor.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<>
  <ThemeTester>
    <NoteEditor
      onSuccess={() => console.log("Success")}
      onError={() => console.log("Error")}
    />
  </ThemeTester>
</>;
```
