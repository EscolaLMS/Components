```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./NoteEditor.png";
import ThemeTester from "../../../styleguide/ThemeTester";
// import NoteEditor from "./NoteEditor.tsx"

<GlobalThemeProvider>
  <ThemeTester>
    <NoteEditor />
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
