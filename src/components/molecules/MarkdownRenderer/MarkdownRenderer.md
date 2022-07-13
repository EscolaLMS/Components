```js
import { ThemeTester } from "../../../styleguide";
import { MarkdownTable } from "../../../";

const markdown = `### Czego się dowiesz i nauczysz?

* Kurs umożliwia nabycie solidnych podstaw z zakresu rachunkowości zarówno pod względem teoretycznym jak i praktycznym
* Kurs podstawy księgowości przygotowuje słuchacza do pracy w działach księgowości * Kurs przygotowuje do zawodu księgowy, który został ujęty w klasyfikacji zawodów (kod zawodu 331301)

#### Do kogo skierowane jest szkolenie?

* Dla pracowników działu księgowości
* Dla osób które swoją karierę zawodową chcą związać z pracą w księgowości
* Dla osób pracujących w działach IT wdrażających systemy księgowe`;

const markdownTable = `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`;

const markdownImage = `![alt text](https://placekitten.com/g/600/600)`;

const markdownLink = `My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").`;

<React.Fragment>
  <ThemeTester flexDirection={"column"} alignItems={"start"}>
    <MarkdownRenderer fontSize={"20"} children={markdown} />
    <MarkdownRenderer>{markdown}</MarkdownRenderer>
    <MarkdownRenderer
      components={{ p: React.Fragment }}
    >{`**8h 12 min** time left`}</MarkdownRenderer>
    <MarkdownRenderer children={markdownLink} />
    <MarkdownRenderer children={markdownTable} />
    <MarkdownRenderer children={markdownImage} />
  </ThemeTester>
</React.Fragment>;
```
