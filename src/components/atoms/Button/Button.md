React component example:

### Default themes

```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

const Icon = () => {
  return (
    <svg
      className="arrows"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z"
        fill="currentColor"
      />
    </svg>
  );
};

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Button>Primary Button</Button>
    <Button loading>Primary Button loading</Button>
    <Button loading block>
      Primary block Button loading
    </Button>
    <Button mode="secondary">Secondary button</Button>
    <Button mode="outline">Outline button</Button>
    <Button loading mode="outline">
      Outline button loading
    </Button>
    <Button mode="white">White button</Button>
    <Button disabled>Primary Button disabled</Button>
    <Button mode="secondary" disabled>
      Secondary button disabled
    </Button>
    <Button invert>Invert button</Button>
    <Button invert loading>
      Invert loading button
    </Button>
    <Button mode="secondary" invert>
      Secondary Invert button
    </Button>
    <Button mode="outline" invert>
      Outline Invert button
    </Button>
    <Button disabled invert>
      Primary Invert Button disabled
    </Button>
    <Button mode="secondary" disabled invert>
      Secondary Invert Button disabled
    </Button>
    <Button mode="icon" aria-label={t("Actions.Hide")}>
      <Icon />
    </Button>
  </ThemeTester>
</React.Fragment>;
```
