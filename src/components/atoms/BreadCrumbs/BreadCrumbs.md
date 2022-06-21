```jsx
import { ImageModal, ThemeTester } from "../../../styleguide";

import { Link } from "../../../";

<ThemeTester flexDirection={"column"}>
  <BreadCrumbs
    items={["Wellms", <Link>courses</Link>, "super course", "lesson XXX"]}
  />

  <div style={{ width: "375px" }}>
    <BreadCrumbs
      hyphen="|"
      items={[
        "Wellms",
        <Link>courses</Link>,
        "super course with hyphen",
        "lesson with long title",
      ]}
    />
  </div>
</ThemeTester>;
```
