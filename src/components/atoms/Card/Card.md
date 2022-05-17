```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { Title } from "../Typography/Title";
import { Text } from "../Typography/Text";
import { IconTitle } from "../IconTitle/IconTitle";
import { Button } from "../Button/Button";
import { useState } from "react";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Card.png";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Card wings={"large"}>
      <Text noMargin>With large wings</Text>
    </Card>
    <Card wings={"small"}>
      <Text noMargin>With small Wings</Text>
    </Card>
    <Card wings={"hidden"}>
      <Text noMargin>Without Wings</Text>
    </Card>

    <Card wings={"large"} inline>
      <Text size="14" noMargin>
        Inline with large wings
      </Text>
    </Card>
    <Card wings={"small"} inline>
      <Text size="14" noMargin>
        Inline with small Wings
      </Text>
    </Card>
    <Card wings={"hidden"} inline>
      <Text size="14" noMargin>
        Inline without Wings
      </Text>
    </Card>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
