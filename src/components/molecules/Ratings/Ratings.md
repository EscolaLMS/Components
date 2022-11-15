```js
import img1 from "./Ratings.png";
import img2 from "./Ratings-2.png";
import { ImageModal, ThemeTester } from "../../../styleguide";
import mockApi from "./mock.json";
import { Title } from "../../atoms/Typography/Title";

const ratingsProps = {
  sumRates: mockApi.sum_rates,
  avgRate: mockApi.avg_rate,
  rates: mockApi.rates,
  header: "Students rating",
};

<ThemeTester childrenListStyle={{ display: "block" }}>
  <div style={{ margin: "0 16px" }}>
    <Title level={3} as="h1">
      Desktop View
    </Title>
    <Ratings {...ratingsProps} />
  </div>
  <div style={{ maxWidth: 360, margin: "auto" }}>
    <div style={{ margin: "0 16px" }}>
      <Title level={3} as="h1">
        Mobile View
      </Title>
      <Ratings mobile {...ratingsProps} />
    </div>
  </div>
  <ImageModal images={[img1, img2]} />
</ThemeTester>;
```
