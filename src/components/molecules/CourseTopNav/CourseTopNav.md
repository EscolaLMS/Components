```js
import { GlobalThemeProvider } from "../../../theme/provider";
import img1 from "./CourseTopNav.png";

import ThemeTester from "../../../styleguide/ThemeTester";

const onNext = () => console.log("onNext");
const onPrev = () => console.log("onPrev");
const onFinish = () => console.log("onFinish");
const onBookmarkClick = () => console.log("onBookmarkClick");

<React.Fragment>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <CourseTopNav
      addNotes={false}
      hasNext
      hasPrev
      isFinished
      onNext={onNext}
      onPrev={onPrev}
      onFinish={onFinish}
    />
    <div style={{ marginTop: 20 }}>
      <CourseTopNav
        addNotes
        hasNext
        hasPrev
        isFinished
        addBookmarks
        onBookmarkClick={onBookmarkClick}
        onNext={onNext}
        onPrev={onPrev}
        onFinish={onFinish}
      />
    </div>
    <div style={{ marginTop: 20 }}>
      <CourseTopNav
        hasNext={false}
        hasPrev
        isFinished={false}
        onNext={onNext}
        onPrev={onPrev}
        onFinish={onFinish}
      />
    </div>
    <div style={{ marginTop: 20 }}>
      <CourseTopNav
        hasNext
        hasPrev
        isFinished={false}
        onNext={onNext}
        addNotes
        addBookmarks
        onBookmarkClick={onBookmarkClick}
        onPrev={onPrev}
        onFinish={onFinish}
      />
    </div>
    <div style={{ margin: "20px auto 0", width: 375 }}>
      <CourseTopNav
        mobile
        hasNext
        hasPrev
        onNext={onNext}
        onPrev={onPrev}
        addNotes
        addBookmarks
        onBookmarkClick={onBookmarkClick}
        onFinish={onFinish}
      />
    </div>
    <div style={{ margin: "20px auto 0", width: 375 }}>
      <CourseTopNav
        mobile
        hasPrev={false}
        hasPrev
        isFinished
        onBookmarkClick={onBookmarkClick}
        onPrev={onPrev}
        onFinish={onFinish}
      />
    </div>
  </ThemeTester>
</React.Fragment>;
```
