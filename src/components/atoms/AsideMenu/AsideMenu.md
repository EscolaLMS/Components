```js
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./AsideMenu.png";
import { Text } from "../../..";
import data from "./mock.json";

const [selected, setSelected] = useState(
  Math.round(Math.random() * data.length)
);

<React.Fragment>
  <ThemeTester>
    <nav style={{ width: "100%" }}>
      {data.map((row, i) => (
        <AsideMenu key={i} active={i === selected}>
          <a
            href={`#!${row.slug}`}
            onClick={(e) => {
              e.preventDefault();
              setSelected(i);
            }}
          >
            <Text size="15" bold>
              {row.title}
            </Text>
          </a>
        </AsideMenu>
      ))}
    </nav>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
