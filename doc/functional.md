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
    <Button
      onClick={() => i18n.changeLanguage("en")}
      disabled={i18n.language === "en"}
    >
      EN
    </Button>
    <Button
      onClick={() => i18n.changeLanguage("fr")}
      disabled={i18n.language === "fr"}
    >
      FR
    </Button>
    <Button
      onClick={() => i18n.changeLanguage("pl")}
      disabled={i18n.language === "pl"}
    >
      PL
    </Button>
  </ThemeTester>
</div>;
```
