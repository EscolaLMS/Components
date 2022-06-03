```jsx
import { ImageModal, ThemeTester } from "../../../styleguide";

import { Link } from "../../../";

<ThemeTester>
  <BreadCrumbs
    items={["Wellms", <Link>courses</Link>, "super course", "lesson XXX"]}
  />

  <BreadCrumbs
    hyphen="|"
    items={["Wellms", <Link>courses</Link>, "super course", "lesson XXX"]}
  />
</ThemeTester>;
```
