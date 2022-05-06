```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Title.png";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Title>This is title h1. Lorem ipsum</Title>
    <Title
      level={2}
      style={{
        marginBottom: 20,
      }}
    >
      This is title h2. Lorem ipsum
    </Title>
    <Title level={3}>This is title h3. Lorem ipsum</Title>
    <Title level={4}>This is title h4. Lorem ipsum</Title>
    <Title level={5}>This is title h5. Lorem ipsum</Title>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
