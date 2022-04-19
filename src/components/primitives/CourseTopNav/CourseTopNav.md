```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./CourseTopNav.png";

const onNext = () => console.log("onNext");
const onPrev = () => console.log("onPrev");
const onFinish = () => console.log("onFinish");

<GlobalThemeProvider>
  <CourseTopNav
    hasNext
    hasPrev
    isFinished
    onNext={onNext}
    onPrev={onPrev}
    onFinish={onFinish}
  />

  <CourseTopNav
    hasNext
    hasPrev
    isFinished={false}
    onNext={onNext}
    onPrev={onPrev}
    onFinish={onFinish}
  />

  <CourseTopNav
    hasNext={false}
    hasPrev
    isFinished={false}
    onNext={onNext}
    onPrev={onPrev}
    onFinish={onFinish}
  />

  <CourseTopNav
    hasNext
    hasPrev={false}
    isFinished={false}
    onNext={onNext}
    onPrev={onPrev}
    onFinish={onFinish}
  />
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
