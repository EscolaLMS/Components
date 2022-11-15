```js
import { ThemeTester } from "../../../styleguide";
import img2 from "./VideoPlayerPoster.png";

<React.Fragment>
  <ThemeTester>
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundImage: `url(${img2})`,
      }}
    >
      <LessonEndscreen
        topic="Hello world"
        countdownValue={10}
        onCancel={() => console.log("Cancel countdowning")}
        onCountdown={() => console.log("Countdown finish")}
        onNextButtonClick={() => console.log("Go to next lesson")}
      />
    </div>
  </ThemeTester>
</React.Fragment>;
```
