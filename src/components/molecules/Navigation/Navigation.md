```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { ImageModal, ThemeTester } from "../../../styleguide";
import img1 from "./Navigation.png";
import logoImage from "./logo-placeholder.png";

const menuItems = [
  {
    title: (
      <a href="#" target="_blank">
        menu-1
      </a>
    ),
    key: "menu-1",
  },
  {
    title: (
      <a href="#" target="_blank">
        menu-2
      </a>
    ),
    key: "menu-2",
  },
  {
    title: "menu-3",
    key: "menu-3",
    children: [
      {
        title: "submenu-1",
        key: "submenu-1",
        children: [
          {
            title: (
              <a href="#" target="_blank">
                subsubmenu-2
              </a>
            ),
            key: "subsubmenu-1",
          },
        ],
      },
    ],
  },
];

<ThemeTester childrenListStyle={{ display: "block" }}>
  <div style={{ width: 360, margin: "auto" }}>
    <Navigation
      mobile
      logo={{
        src: logoImage,
        width: 33,
        heigth: 33,
      }}
      menuItems={menuItems}
    />
  </div>
  <ImageModal images={[img1]} />
</ThemeTester>;
```
