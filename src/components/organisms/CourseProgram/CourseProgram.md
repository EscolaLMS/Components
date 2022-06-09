```js
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <div style={{ width: "100%" }}>
      <CourseProgram
        lessons={data.lessons}
        onTopicClick={(topic) => console.log("onTopicClick topic", topic)}
      />
    </div>
    <div style={{ width: "375px" }}>
      <CourseProgram
        mobile
        lessons={data.lessons}
        onTopicClick={(topic) => console.log("onTopicClick topic", topic)}
      />
    </div>
  </ThemeTester>
</React.Fragment>;
```
