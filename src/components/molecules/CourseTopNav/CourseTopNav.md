```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./CourseTopNav.png";

import ThemeTester from "../../../styleguide/ThemeTester";

const onNext = () => console.log("onNext");
const onPrev = () => console.log("onPrev");
const onFinish = () => console.log("onFinish");
const onNoteClick = () => console.log("onNoteClick");

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
        onNext={onNext}
        onPrev={onPrev}
        onFinish={onFinish}
        onNoteClick={onNoteClick}
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
        onNoteClick={onNoteClick}
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
        onNoteClick
        onFinish={onFinish}
      />
    </div>
    <div style={{ margin: "20px auto 0", width: 375 }}>
      <CourseTopNav
        mobile
        hasPrev={false}
        hasPrev
        isFinished
        onNoteClick
        onPrev={onPrev}
        onFinish={onFinish}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
