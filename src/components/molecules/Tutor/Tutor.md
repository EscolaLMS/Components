```js
import { GlobalThemeProvider } from "../../../theme/provider";
import img1 from "./Tutor.png";
import ThemeTester from "../../../styleguide/ThemeTester";
import avatar from "./TutorExampleAvatar.png";
import { Title } from "../../atoms/Typography/Title";

<GlobalThemeProvider>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <Title level={3}>Desktop View</Title>
    <Tutor
      avatar={{
        alt: "John Doe Image",
        src: avatar,
      }}
      rating={{
        ratingValue: 4.1,
      }}
      title={
        <Title as="h3" level={4} className="title">
          Teacher
        </Title>
      }
      fullName={"John Doe"}
      coursesInfo={"8 Curses"}
      description={
        "Praktyk z 15 letnim doświadczeniem w zarządzaniu zarówno mikro jak i makro przedsiębiorstwami. Odpowiadał za opracowanie biznesplanu dla firm tj.: CCC, Allegro, 4F"
      }
    />
    <Title level={3}>Mobile View</Title>
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
      mobile
    />
  </ThemeTester>
</GlobalThemeProvider>;
```
