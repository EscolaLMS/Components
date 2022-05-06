```js
import {GlobalThemeProvider} from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./Description.png";

<React.Fragment>
    <ThemeTester flexDirection="column">
        <Description title={"Kategoria szkolenia"}>Finanse</Description>
        <Description title={"Kategoria szkolenia"}>Finanse</Description>
        <Description title={"Kategoria szkolenia"}>Finanse</Description>
    </ThemeTester>
    <ImageModal images={[img1]}/>
</React.Fragment>;
```
