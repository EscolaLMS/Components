```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
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
  handleBtn1: () => {
    console.log("handleBtn1");
  },
  handleBtn2: () => {
    console.log("handleBtn2");
  },
};

<GlobalThemeProvider>
  <div style={{ width: "100%", marginBottom: "20px" }}>
    <QuizCta
      title={props.title}
      children={props.children}
      handleBtn1={props.handleBtn1()}
      handleBtn2={props.handleBtn2()}
    />
  </div>
  <div style={{ width: "375px" }}>
    <QuizCta
      mobile={true}
      title={props.title}
      children={props.children}
      handleBtn1={props.handleBtn1()}
      handleBtn2={props.handleBtn2()}
    />
  </div>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
