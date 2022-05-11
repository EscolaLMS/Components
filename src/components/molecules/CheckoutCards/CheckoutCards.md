```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import ThemeTester from "../../../styleguide/ThemeTester";
import img1 from "./CheckoutCards.png";

<GlobalThemeProvider>
  <ThemeTester flexDirection="column" alignItems={"start"}>
    <div style={{ width: "100%" }}>
      <CheckoutCards
        orders={[
          {
            id: 1,
            title: "Product 1",
            lessons: 10,
            price: 100,
            oldPrice: 50,
            satisfaction: 80,
            guarantee: true,
            rating: 4.5,
            handleDelete: () => {
              console.log("delete");
            },
          },
          {
            id: 2,
            title: "Product 1",
            lessons: 10,
            price: 100,
            oldPrice: 50,
            satisfaction: 80,
            guarantee: true,
            rating: 4.5,
            handleDelete: () => {
              console.log("delete");
            },
          },
        ]}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
