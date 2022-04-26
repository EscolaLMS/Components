Functional Components represents how to connect other components with application logic

## Translation

```js
import { useTranslation } from "react-i18next";

import "../src/styleguide/i18n.ts";

import { Title, Button } from "../src/index.ts";
import ThemeTester from "../src/styleguide/ThemeTester";

const { t, i18n } = useTranslation();

<div>
  <ThemeTester>
    <Title>{t("Welcome to Wellms")}</Title>
    {["en", "fr", "pl"].map((langCode) => (
      <Button
        key={langCode}
        onClick={() => i18n.changeLanguage(langCode)}
        disabled={i18n.language === langCode}
      >
        {langCode}
      </Button>
    ))}
  </ThemeTester>
</div>;
```
