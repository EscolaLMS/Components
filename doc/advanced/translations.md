```js
import { useTranslation } from "react-i18next";

import "../../src/styleguide/i18n.ts";

import { Title, Button } from "../../src/index.ts";
import { ThemeTester } from "../../src/styleguide";

const { t, i18n } = useTranslation();

<div>
  <ThemeTester>
    <Title>{t("I18n.welcomeToWellms")}</Title>
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
