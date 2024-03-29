```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { ThemeTester } from "../../../styleguide";
import img1 from "./Navigation.png";
import logoImage from "./logo-placeholder.png";
import { useState } from "react";
import { Text, Search, Button } from "../../../";

const [loading, setLoading] = useState(false);

const onSearch = (value) => {
  console.log(`Search: ${value}`);
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
};

const onSubmit = (value) => {
  console.log(`Submit ${value}`);
};

const onChange = (value) => {
  console.log(`Change: ${value}`);
};

const menuItems = [
  {
    title: (
      <a href="#" target="_blank">
        <Text noMargin bold>
          menu-1
        </Text>
      </a>
    ),
    key: "menu-1",
  },
  {
    title: (
      <a href="#" target="_blank">
        <Text noMargin bold>
          menu-2
        </Text>
      </a>
    ),
    key: "menu-2",
  },
  {
    title: (
      <Text noMargin bold>
        menu-3
      </Text>
    ),
    key: "menu-3",
    children: [
      {
        title: (
          <Text noMargin bold>
            submenu-1
          </Text>
        ),
        key: "submenu-1",
        children: [
          {
            title: (
              <a href="#" target="_blank">
                <Text noMargin bold>
                  submenu-1
                </Text>
              </a>
            ),
            key: "subsubmenu-1",
          },
        ],
      },
    ],
  },
  {
    title: (
      <Button block mode={"secondary"}>
        Block button
      </Button>
    ),
    key: "block-button",
  },
];

<ThemeTester childrenListStyle={{ display: "block" }}>
  <div style={{ width: 375, margin: "auto" }}>
    <Navigation
      mobile
      logo={{
        src: logoImage,
        width: 33,
        heigth: 33,
        alt: "Logo",
      }}
      menuItems={menuItems}
      search={
        <Search
          onSubmit={(e) => onSubmit(e)}
          onChange={(e) => onChange(e)}
          onSearch={(e) => onSearch(e)}
          placeholder="Select a course"
          loading={loading}
        >
          <Text noMargin>football</Text>
          <Text noMargin>voleyball</Text>
          <Text noMargin>basketball</Text>
        </Search>
      }
    />
  </div>
</ThemeTester>;
```
