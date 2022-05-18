This component allows to you use Aspect Ratio Boxes, for eg images / videos.

```js
import { useState } from "react";

const [ratio, setRatio] = useState(0.5);
const [width, setWidth] = useState(500);
const [objectPosition, setObjectPosition] = useState("center");

const rndCat = () =>
  `http://placekitten.com/${200 + Math.round(Math.random() * 500)}/${
    200 + Math.round(Math.random() * 500)
  }`;

<div style={{ width: width }}>
  <p>
    Width:{" "}
    <input
      type="number"
      step="10"
      min="200"
      max="800"
      value={width}
      onChange={(e) => {
        setWidth(Number(e.target.value));
      }}
    />
    {" | "}
    Ratio:{" "}
    <input
      type="number"
      step="0.01"
      min="0.01"
      max="1"
      value={ratio}
      onChange={(e) => setRatio(Number(e.target.value))}
    />
    Object position: <select
      value={objectPosition}
      onChange={(e) => setObjectPosition(e.target.value)}
    >
      <option>center</option>
      <option>top</option>
      <option>bottom</option>
    </select>
    <br />
  </p>

  <p>
    Ratio {ratio}, object Position {objectPosition}
  </p>

  <RatioBox ratio={ratio} objectPosition={objectPosition}>
    <img src={rndCat()} />
  </RatioBox>

  <p>Ratio 1 = Square</p>
  <RatioBox ratio={1}>
    <img src={rndCat()} />
  </RatioBox>

  <p>Ratio 1.5 = Rectangle vertical</p>
  <RatioBox ratio={1.5}>
    <img src={rndCat()} />
  </RatioBox>

  <p>Ratio 0.5 = Rectangle horizontal</p>
  <RatioBox ratio={0.5}>
    <img src={rndCat()} />
  </RatioBox>
</div>;
```
