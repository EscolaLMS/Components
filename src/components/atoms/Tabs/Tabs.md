```js
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import { Text } from "../../../";
import img1 from "./Tabs.png";

const props = {
  tabs: [
    {
      label: "Plan kursu",
      key: 33,
      component: "Tab 1 content",
    },
    {
      label: "Do przeczytania",
      key: 50,
      component: <Text>Tab 2 content</Text>,
    },
    {
      label: "Materiały do pobrania",
      key: 22,
      component: <Text>Tab 3 content</Text>,
    },
    {
      label: "Zaplanowane",
      key: 23,
      component: <Text>Tab 4 content</Text>,
    },
  ],
  defaultActiveKey: 22,
  onClick: (key) => console.log(`onClick tab id: ${key}`),
};

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Tabs
        tabs={props.tabs}
        defaultActiveKey={props.defaultActiveKey}
        onClick={props.onClick}
      />
    </div>
    <div style={{ width: 355 }}>
      <Tabs tabs={props.tabs} />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
