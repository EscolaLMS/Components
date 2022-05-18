```js
import { GlobalThemeProvider } from "../../../theme/provider";
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
  primaryBtnText: "Rozpocznij quiz",
  handlePrimaryBtn: () => {
    console.log("handlePrimaryBtn");
  },
  tertiaryBtnText: "Następny moduł",
  handleTertiaryBtn: () => {
    console.log("handleTeriaryBtn");
  },
};

<GlobalThemeProvider>
  <ThemeTester>
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <QuizCta
        title={props.title}
        children={props.children}
        primaryBtnText={props.primaryBtnText}
        handlePrimaryBtn={props.handlePrimaryBtn}
        tertiaryBtnText={props.tertiaryBtnText}
        handleTertiaryBtn={props.handleTertiaryBtn}
      />
    </div>
    <div style={{ width: "375px" }}>
      <QuizCta
        mobile
        title={props.title}
        children={props.children}
        primaryBtnText={props.primaryBtnText}
        handlePrimaryBtn={props.handlePrimaryBtn}
        tertiaryBtnText={props.tertiaryBtnText}
        handleTertiaryBtn={props.handleTertiaryBtn}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
