```js
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Notes.png";
import { Title } from "../../atoms/Typography/Title";
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
  <Title level={3}>Desktop View</Title>
  <Notes
    noteGroups={noteGroups}
    onAddNoteClick={() => console.log("On add node click")}
  />
  <div style={{ maxWidth: 360, margin: "auto" }}>
    <div style={{ margin: "0 16px" }}>
      <Title level={3}>Mobile View</Title>
      <Notes
        mobile
        noteGroups={noteGroups}
        onAddNoteClick={() => console.log("On add node click")}
      />
    </div>
  </div>
  <ImageModal images={[img1]} />
</ThemeTester>;
```
