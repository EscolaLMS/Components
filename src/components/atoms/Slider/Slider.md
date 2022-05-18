```js
import { useState } from "react";
import ThemeTester from "../../../styleguide/ThemeTester";

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const dotsOptions = [
  "top",
  "top right",
  "top left",
  "bottom",
  "bottom left",
  "bottom right",
];

const [dots, setDots] = useState(true);

const [dotsOption, setDotOption] = useState("top");

<ThemeTester childrenListStyle={{ display: "block" }}>
  <div>
    Dots{" "}
    <input
      type="checkbox"
      checked={dots}
      onChange={(v) => setDots(v.target.checked)}
    />
    Dots position: <select
      value={dotsOption}
      onChange={(v) => setDotOption(v.target.value)}
    >
      {dotsOptions.map((o) => (
        <option>{o}</option>
      ))}
    </select>
  </div>
  <Slider settings={{ ...settings, dots }} dotsPosition={dotsOption}>
    <div>
      <img
        src="https://placekitten.com/500/210"
        alt="kitten1"
        style={{ width: "100%" }}
      />
    </div>
    <div>
      <img
        src="https://placekitten.com/501/210"
        alt="kitten 2"
        style={{ width: "100%" }}
      />
    </div>
    <div>
      <img
        src="https://placekitten.com/502/210"
        alt="kitten 3"
        style={{ width: "100%" }}
      />
    </div>
    <div>
      <img
        src="https://placekitten.com/503/210"
        alt="kitten 4"
        style={{ width: "100%" }}
      />
    </div>
    <div>
      <img
        src="https://placekitten.com/504/210"
        alt="kitten 5"
        style={{ width: "100%" }}
      />
    </div>
    <div>
      <img
        src="https://placekitten.com/505/210"
        alt="kitten 6"
        style={{ width: "100%" }}
      />
    </div>
  </Slider>
</ThemeTester>;
```
