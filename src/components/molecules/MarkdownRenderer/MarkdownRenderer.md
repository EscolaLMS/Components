```js
import { ThemeTester } from "../../../styleguide";

const markdown = {
  text: `### Czego się dowiesz i nauczysz?

* Kurs umożliwia nabycie solidnych podstaw z zakresu rachunkowości zarówno pod względem teoretycznym jak i praktycznym
* Kurs podstawy księgowości przygotowuje słuchacza do pracy w działach księgowości * Kurs przygotowuje do zawodu księgowy, który został ujęty w klasyfikacji zawodów (kod zawodu 331301)

#### Do kogo skierowane jest szkolenie?

* Dla pracowników działu księgowości
* Dla osób które swoją karierę zawodową chcą związać z pracą w księgowości
* Dla osób pracujących w działach IT wdrażających systemy księgowe`,
  table: `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`,
  image: `![alt text](https://placekitten.com/g/600/600)`,
  link: `My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").`,
  mathInline: "$c = \\pm\\sqrt{a^2 + b^2}$",
  mathBlock: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`,
  mathMatrix: `$$
M = 
\\begin{bmatrix}
\\frac{5}{6} & \\frac{1}{6} & 0 \\\\\[0.3em]
\\frac{5}{6} & 0 & \\frac{1}{6} \\\\\[0.3em]
0 & \\frac{5}{6} & \\frac{1}{6}
\\end{bmatrix}
$$`,
};

<ThemeTester flexDirection={"column"} alignItems={"start"}>
  {Object.entries(markdown).map(([key, markdownContent]) => (
    <MarkdownRenderer key={key}>{markdownContent}</MarkdownRenderer>
  ))}
</ThemeTester>;
```
