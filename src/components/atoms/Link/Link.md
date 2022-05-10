```js
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Link.png";

<>
  <ThemeTester>
    <Link href="http://onet.pl" target="_blank">
      Onet
    </Link>
    <Link href="http://onet.pl" target="_blank" underline>
      Onet
    </Link>
    <Link underline onClick={(e) => console.log(e)}>
      Onet
    </Link>
  </ThemeTester>
  <ImageModal images={[img1]} />
</>;
```
