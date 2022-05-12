```js
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Notes.png";
const noteGroups = [
  {
    title: "lession 1",
    notes: [
      {
        description: "Simple node",
        time: "15:10",
        color: "red",
      },
      {
        description: "Note without color",
        time: "14:00",
      },
      {
        description: "Note with color",
        time: "15:10",
      },
    ],
  },
  {
    title: "lession 2",
    notes: [
      {
        description: "Front-end lession",
        time: "12:00",
        color: "blue",
      },
      {
        description: "Back-end lession",
        time: "18:00",
      },
    ],
  },
];

<ThemeTester childrenListStyle={{ display: "block" }}>
  <Notes
    noteGroups={noteGroups}
    onAddNoteClick={() => console.log("On add node click")}
  />
  <ImageModal images={[img1]} />
</ThemeTester>;
```
