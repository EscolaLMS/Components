```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { Title } from "../Typography/Title";
import { Text } from "../Typography/Text";
import { IconTitle } from "../IconTitle/IconTitle";
import { Button } from "../Button/Button";
import { useState } from "react";

<React.Fragment>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <Card style={{ marginTop: 60 }} wingsSize={"large"}>
      <Text style={{ margin: 0 }}>With large wings</Text>
    </Card>
    <Card wingsSize={"small"} style={{ marginTop: 30 }}>
      <Text style={{ margin: 0 }}>With small Wings</Text>
    </Card>
    <Card wingsSize={"small"} smallPadding style={{ marginTop: 30 }}>
      <Text style={{ margin: 0 }}>With small Wings and padding</Text>
    </Card>
    <Card style={{ marginTop: 30 }}>
      <Text style={{ margin: 0 }}>Without Wings</Text>
    </Card>
    <Card smallPadding style={{ marginTop: 30 }}>
      <Text style={{ margin: 0 }}>Without Wings and small padding</Text>
    </Card>
  </ThemeTester>
</React.Fragment>;
```
