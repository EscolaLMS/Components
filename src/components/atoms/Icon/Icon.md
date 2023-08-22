```js
import { useState, useCallback } from "react";
import { Text } from "../Typography/Text";
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";
import { ICONS } from "./icons";

const [hovered, setHovered] = useState("");
const [saved, setSaved] = useState("");

const copyToClipboard = useCallback((text) => {
  navigator.clipboard.writeText(text);
  setSaved(text);
}, []);

const icons = Object.keys(ICONS);

<ThemeTester flexDirection="column">
  <Text style={{ margin: 0 }}>"{hovered}" was last hovered.</Text>
  {saved ? (
    <p style={{ display: "flex", gap: "4px", alignItems: "center", margin: 0, height: '30px' }}>
      <Icon name={saved} />
      <Text
        as="span"
        size="12"
      >{`"${saved}" was saved in your clipboard.`}</Text>
    </p>
  ) : (
    <Text size="12" style={{height: '30px', margin: 0}}>Click on icon to copy name.</Text>
  )}
  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
    {icons.map((name) => (
      <button
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
        }}
        onClick={() => copyToClipboard(name)}
      >
        <Icon onMouseEnter={() => setHovered(name)} name={name} />
      </button>
    ))}
  </div>
</ThemeTester>;
```
