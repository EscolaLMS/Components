```js
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import Text from "../../atoms/Typography/Text";
import img1 from "./QuizCta.png";

const props = {
  title: "Szybki Quiz",
  children: (
    <React.Fragment>
      <Text bold>Utrwal wiedzę po ukończonym module</Text>
      <Text>Quiz zawiera 2-3 pytania jednokrotnego wyboru</Text>
    </React.Fragment>
  ),
  primaryButtonText: "Rozpocznij quiz",
  onPrimaryButtonClick: () => {
    console.log("onPrimaryButtonClick");
  },
  secondaryButtonText: "Następny moduł",
  onSecondaryButtonClick: () => {
    console.log("handleTeriaryBtn");
  },
};

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <QuizCta
        title={props.title}
        children={props.children}
        primaryButtonText={props.primaryButtonText}
        onPrimaryButtonClick={props.onPrimaryButtonClick}
        secondaryButtonText={props.secondaryButtonText}
        onSecondaryButtonClick={props.onSecondaryButtonClick}
      />
    </div>
    <div style={{ width: "375px" }}>
      <QuizCta
        mobile
        title={props.title}
        children={props.children}
        primaryButtonText={props.primaryButtonText}
        onPrimaryButtonClick={props.onPrimaryButtonClick}
        secondaryButtonText={props.secondaryButtonText}
        onSecondaryButtonClick={props.onSecondaryButtonClick}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
