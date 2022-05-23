Components and their style do not have any css `break-points` to determine whether this mobile/desktop any other device view.

This is controlled by `mobile` props in some the components.

You can use a library like [react-device-detect](https://www.npmjs.com/package/react-device-detect) or write you own hook using [window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

**Example** how to render mobile view of component

```jsx static
import { isMobile } from "react-device-detect";
return <Component mobile={isMobile} />;
```
