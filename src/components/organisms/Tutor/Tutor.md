```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Tutor.png";
import ThemeTester from "../../../styleguide/ThemeTester";
import avatar from "./TutorExampleAvatar.png";

<GlobalThemeProvider>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <Tutor
      avatar={{
        alt: "John Doe Image",
        src: avatar,
      }}
      rating={{
        ratingValue: 4.1,
      }}
      title={"Teacher"}
      fullName={"John Doe"}
      coursesInfo={"8 Curses"}
      description={
        "Praktyk z 15 letnim doświadczeniem w zarządzaniu zarówno mikro jak i makro przedsiębiorstwami. Odpowiadał za opracowanie biznesplanu dla firm tj.: CCC, Allegro, 4F"
      }
    />
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
