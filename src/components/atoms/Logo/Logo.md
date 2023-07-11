```js
import logo1 from "./logo-placeholder.png";
import logo2 from "./logo-placeholder2.png";
import Text from "../Typography/Text";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <div>
      <Text style={{ marginBottom: "8px" }}>Default logo</Text>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Logo src={logo1} alt={"logo1"} />
        <Logo src={logo2} alt={"logo2"} />
      </div>
    </div>
    <div>
      <Text style={{ marginBottom: "10px" }}>Small logo</Text>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Logo src={logo1} alt={"logo1"} isSmall />
        <Logo src={logo2} alt={"logo2"} isSmall />
      </div>
    </div>
  </ThemeTester>
</React.Fragment>;
```
