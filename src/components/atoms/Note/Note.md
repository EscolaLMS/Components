```js
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./note.png";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Note description={"Note without color"} time={"15:20"} />
    <Note description={"Note with color"} time={"15:20"} color={"red"} />
    <Note
      description={
        "Note with color and long text t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
      }
      time={"15:20"}
      color={"#09c3bc"}
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
