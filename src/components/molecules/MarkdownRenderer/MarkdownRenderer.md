```js
import { ThemeTester } from "../../../styleguide";

const markdown = `### Czego się dowiesz i nauczysz?

* Kurs umożliwia nabycie solidnych podstaw z zakresu rachunkowości zarówno pod względem teoretycznym jak i praktycznym
* Kurs podstawy księgowości przygotowuje słuchacza do pracy w działach księgowości * Kurs przygotowuje do zawodu księgowy, który został ujęty w klasyfikacji zawodów (kod zawodu 331301)

#### Do kogo skierowane jest szkolenie?

* Dla pracowników działu księgowości
* Dla osób które swoją karierę zawodową chcą związać z pracą w księgowości
* Dla osób pracujących w działach IT wdrażających systemy księgowe`;

<React.Fragment>
  <ThemeTester>
    <MarkdownRenderer children={markdown} />

    <MarkdownRenderer>{markdown}</MarkdownRenderer>
  </ThemeTester>
</React.Fragment>;
```
