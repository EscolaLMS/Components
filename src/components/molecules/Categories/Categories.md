```js
import { ThemeTester, ImageModal } from "../../../styleguide";
import { Title } from "../../../";
import img1 from "./Categories.png";
import img2 from "./Categories-2.png";
import json from "./mock.json";

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Categories
        content={[
          {
            categories: json.data,
            label: "Długość trwania",
            selectedValues: [4, 16],
            handleChange: (value) => console.log(`change ${value}`),
          },
          {
            categories: json.data,
            label: "Data materiału",
            selectedValues: [4],
            handleChange: (value) => console.log(`change ${value}`),
          },
          {
            categories: json.data,
            label: "Więcej",
            selectedValues: [21, 4],
            handleChange: (value) => console.log(`change ${value}`),
          },
        ]}
      />
    </div>
    <div style={{ width: 375 }}>
      <Categories
        mobile
        content={[
          {
            categories: json.data,
            label: "Długość trwania",
            selectedValues: [4],
            handleChange: (value) => console.log(`change ${value}`),
          },
          {
            categories: json.data,
            label: "Data materiału",
            selectedValues: [4],
            handleChange: (value) => console.log(`change ${value}`),
          },
          {
            categories: json.data,
            label: "Więcej",
            selectedValues: [21, 4],
            handleChange: (value) => console.log(`change ${value}`),
          },
        ]}
        drawerTitle={
          <Title
            level={5}
            noMargin
            styl={{
              fontSize: "14px",
            }}
          >
            Filtry
          </Title>
        }
        handleDrawerBtnClick={() => console.log("handleDrawerBtnClick")}
        drawerBtnText="Pokaż wyniki"
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1, img2]} />
</React.Fragment>;
```
