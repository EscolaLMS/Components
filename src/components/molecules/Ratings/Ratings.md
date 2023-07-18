```js
import { ThemeTester } from "../../../styleguide";
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
</ThemeTester>;
```
